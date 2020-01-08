import {Component, EventEmitter, Method, Event, Prop, Element, State, h} from "@stencil/core";
import {SensorListenerHandle} from "../../core/sensors/sensor";
import {SampleData} from "../../core/sensors/sample-data";
import {QuestionsysSensorManager} from "../../core/sensor-manager";
import {SensorUIConfig} from "../sensor-configuration/sensor-configuration.component";
import {SensorHostElement} from "../../core/sensor-host-element";


@Component({
  tag: "sensor-element",
  shadow: true
})
export class SensorComponent implements SensorHostElement{

  @Element() element;

  @Prop() sensor: string;

  @Prop() action: "watch" | "get" | "push" | "record";

  @Prop() scope: "global" | "local" = "global";

  @Prop() options: any;

  @Event() sampleData: EventEmitter<SampleData>;

  @Event() error: EventEmitter<Error>;

  @State() configAvailable: boolean = false;

  private uiConfig: SensorUIConfig;

  private listener: SensorListenerHandle;

  private errorListener: SensorListenerHandle;

  private recordingId: string;


  @Method()
  async pull(options?: any){
    return await QuestionsysSensorManager.get(this.sensor, options);
  }

  @Method()
  async push(options?: any, data?: any){
    return await QuestionsysSensorManager.push(this.sensor, options, data);
  }

  @Method()
  async presentUiConfig(config: SensorUIConfig){
    this.uiConfig = config;
    this.configAvailable = true;
  }

  async componentDidLoad() {

    this.errorListener = await QuestionsysSensorManager.onSensorError(this.sensor, (error: Error) => {
      console.log(error);
      this.error.emit(error);
    });

    console.log(this.errorListener);

    await QuestionsysSensorManager.start(this.sensor, this.scope === "local" ? this.element : undefined);

    switch (this.action) {
      case "watch": {
        this.listener = await QuestionsysSensorManager.watch(this.sensor, this.options, (data: SampleData) => {
          console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
          this.sampleData.emit(data);
        });
        break;
      }
      case "get": {
        const data = await QuestionsysSensorManager.get(this.sensor, this.options);
        console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
        this.sampleData.emit(data);
        break;
      }
      case "push": {
        const data = await QuestionsysSensorManager.push(this.sensor, this.options, null);
        console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
        this.sampleData.emit(data);
        break;
      }
      case "record": {
        this.recordingId = await QuestionsysSensorManager.record(this.sensor, this.options);
        break;
      }
      default: {
        console.log("No appropriate action")
      }

    }

  }


  async componentDidUnload() {
    if(this.listener != undefined) {
      this.listener.remove();
    }

    if(this.errorListener != undefined){
      this.errorListener.remove();
    }

    await QuestionsysSensorManager.stop(this.sensor);

    if(this.action === "record") {
      const recording = QuestionsysSensorManager.getRecording(this.sensor, this.recordingId);
      //@ts-ignore;
      this.sampleData.emit(recording)
    }
  }

  render() {

    if(this.configAvailable){

      const DynamicConfigComponent = this.uiConfig.component;

      return <DynamicConfigComponent
                {...this.uiConfig.properties}
                onSuccess={(data) => { this.uiConfig.success(data); this.configAvailable = false }}
                onError={(error) => {this.uiConfig.error(error); this.configAvailable = false}}
             />

    }

    return null;
  }

}
