import {SampleData} from "./sample-data";
import {mergeConfig, SensorConfig} from "./sensor-config";
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
    isRecording: false,
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

  async get(options?: any): Promise<SampleData> {

    if(!this.canGet){
      console.warn(`${this.name} does not support the following action: PULL`);
      return null;
    }

    if(this.canGet && this.onGet == undefined){
      console.warn(`Missing onPull implementation for ${this.name}`);
      return null;
    }

    try {
      const data = await this.onGet(options);
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

  async record(options?: any): Promise<string> {

      if(!this.canRecord) {
      console.warn(`${this.name} does not support the following action: STREAM`);
      return ;
    }

    if(this.canRecord && this.onRecord == undefined) {
      console.warn(`Missing onStream implementation for ${this.name}`);
      return null;
    }

    try {

      if(!this.isRecording) {
        const recordingId = await this.onRecord(options);
        this.state = {
          ...this.state,
          isRecording: true,
        }

        return recordingId;
      }

    } catch (e) {
      this.onSensorError(e);
    }

  }

  public async onError(handler: ListenerCallback<Error>): Promise<SensorListenerHandle> {
    return this.addListener("error", handler);
  };

  protected async onStart?(domRef?: SensorHostElement): Promise<void>;

  protected async onStop?(): Promise<void>;

  protected async onWatch?(options?: any): Promise<void>;

  protected async onGet?(options?: any): Promise<any>;

  protected async onPush?(options?: any, data?: any): Promise<any>;

  protected async onRecord?(options?: any): Promise<string>;

  public getRecording?(id: string): File;

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

  private createSampleData<T>(data: T): SampleData<T> {
    return {
      data,
      timestamp: Date.now(),
      sensor: this.name
    }
  }

  public get name(): string {
    return this.config.name;
  }

  public get canWatch(): boolean {
    return this.config.actions.watch;
  }

  public get canGet(): boolean {
    return this.config.actions.get;
  }

  public get canPush(): boolean {
    return this.config.actions.push;
  }

  public get canRecord(): boolean {
    return this.config.actions.record;
  }

  public get isWatching(): boolean {
    return this.state.isWatching;
  }

  public get isRecording(): boolean {
    return this.state.isRecording;
  }

  public get isRunning(): boolean {
    return this.state.isRunning;
  }

}
