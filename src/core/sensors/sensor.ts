import {SampleData} from "./sample-data";
import {mergeConfig, SensorConfig} from "./sensor-config";
import {QuestionsysSensorManager} from "../sensor-manager";
import {SensorUIConfig} from "../../components/sensor-configuration/sensor-configuration.component";
import {SensorHostElement} from "../sensor-host-element";

export type ListenerCallback<T> = (data: T) => void;

export interface SensorListenerHandle{
  remove: () => void;
}

export abstract class Sensor{

  private config: SensorConfig;

  private state: {[key: string]: any} = {
    isRunning: false,
    isWatching: false,
  };

  private listeners: {[eventName: string]: ListenerCallback<any>[]} = {};


  protected constructor(config: SensorConfig) {
    this.config = mergeConfig(config);
  }

  async start(domRef?: SensorHostElement): Promise<void> {

    if(!this.isRunning){

      if(this.onStart == undefined) {
        this.state = {...this.state, isRunning: true};
        return;
      }

      try {
        await this.onStart(domRef);
        this.state = {...this.state, isRunning: true};
      } catch (e) {
        this.onSensorError(e);
      }

    }

  }

  async stop(): Promise<void> {

    if(this.hasListeners("change")){
      return ;
    }

    if(this.isRunning){
      if(this.onStop == undefined) {
        this.state = {...this.state, isRunning: false};
        return ;
      }

      try {
        await this.onStop()
      } catch (e) {
        this.onSensorError(e);
      }

      this.state = {...this.state, isRunning: false};
    }

  }

  async watch(options: any = {}, handler: ListenerCallback<SampleData>): Promise<SensorListenerHandle>{

    if(!this.canWatch){
      console.warn(`${this.name} does not support the following action: WATCH`);
      return ;
    }

    if(this.canWatch && this.onWatch == undefined){
      console.warn(`Missing onWatch implementation for ${this.name}`);
      return;
    }

    try {

      if(!this.isWatching){
        await this.onWatch(options);
        this.state = {...this.state, isWatching: true};
      }

      return this.addListener("change", handler);

    } catch (e) {
      this.onSensorError(e);
    }
  }

  async pull(options?: any): Promise<SampleData> {

    if(!this.canPull){
      console.warn(`${this.name} does not support the following action: PULL`);
      return null;
    }

    if(this.canPull && this.onPull == undefined){
      console.warn(`Missing onPull implementation for ${this.name}`);
      return null;
    }

    try {
      const data = await this.onPull(options);
      return this.createSampleData(data);
    }catch (e) {
      this.onSensorError(e);
    }
  }

  async push(options?: any, data?: any): Promise<any> {

    if(!this.canPush){
      console.warn(`${this.name} does not support the following action: PUSH`);
      return ;
    }

    if(this.canPush && this.onPush == undefined){
      console.warn(`Missing onPush implementation for ${this.name}`);
      return;
    }

    try {
      return await this.onPush(options, data);
    } catch (e) {
      this.onSensorError(e);
    }
  }

  onError(handler: ListenerCallback<Error>): SensorListenerHandle {
    return this.addListener("error", handler);
  };

  protected async onStart?(domRef?: SensorHostElement): Promise<void>;

  protected async onStop?(): Promise<void>;

  protected async onWatch?(options?: any): Promise<void>;

  protected async onPull?(options?: any): Promise<any>;

  protected async onPush?(options?: any, data?: any): Promise<any>;

  protected async requestUserConfiguration(config: SensorUIConfig): Promise<any>{
    return new Promise(async (resolve, reject) => {

      const success = (data: any) => {
        resolve(data);
      };

      const error = (error) => {
        reject(error);
      };

      const {host} = config;

      const configuration = {
        success,
        error,
        ...config
      };

      if(host !== undefined){
        await (host as SensorHostElement & HTMLElement).presentUiConfig(configuration);
      } else {
        let sensorConfigManager = document.querySelector("sensor-configuration") as any;

        if(!sensorConfigManager){
          sensorConfigManager = document.createElement("sensor-configuration") as any;

          document.body.appendChild(sensorConfigManager);
          await sensorConfigManager.componentOnReady();
        }

        await sensorConfigManager.addConfig(configuration);
      }

    });
  }


  private addListener(eventName: string, listener: ListenerCallback<any>): SensorListenerHandle {

    const listeners = this.listeners[eventName];

    if(!listeners){
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listener);

    return {
      remove: () => {
        this.removeListener(eventName, listener);
      }
    }

  }

  private removeListener(eventName: string, listener: ListenerCallback<any>){

    const listeners = this.listeners[eventName];

    if(!listeners){
      return;
    }

    const index = listeners.indexOf(listener);
    this.listeners[eventName].splice(index, 1);
  }

  private hasListeners(eventName: string): boolean{

    const listeners = this.listeners[eventName];

    return !(!listeners || listeners.length < 1);
  }

  protected onSensorDataChanged(data: any) {
    const toPublish = this.createSampleData(data);
    this.notify("change", toPublish);
  }

  protected onSensorError(error: Error){
    this.notify("error", error);
  }

  private notify( eventName: string, data: any ): void {

    const listeners = this.listeners[eventName];

    if(listeners){
      listeners.forEach((listener) => listener(data));
    }

  }

  private createSampleData(data: any): SampleData {
    return {
      data: {...data},
      timestamp: Date.now(),
      sensor: this.name
    }
  }

  public get manager(){
    return QuestionsysSensorManager;
  }

  public get name(): string {
    return this.config.name;
  }

  public get canWatch(): boolean {
    return this.config.actions.watch;
  }

  public get canPull(): boolean {
    return this.config.actions.pull;
  }

  public get canPush(): boolean {
    return this.config.actions.push;
  }

  public get isWatching(): boolean {
    return this.state.isWatching;
  }

  public get isRunning(): boolean {
    return this.state.isRunning;
  }

}