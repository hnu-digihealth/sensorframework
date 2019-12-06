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

  @Prop() action: "watch" | "get" | "push" | "stream";

  @Prop() scope: "global" | "local" = "global";

  @Prop() options: any;

  @Event() sampleData: EventEmitter<SampleData>;

  @State() configAvailable: boolean = false;

  private uiConfig: SensorUIConfig;

  private listener: SensorListenerHandle;


  private async start(){

    switch (this.action) {
      case "watch": {
        this.listener = await QuestionsysSensorManager.watchSensorData(this.sensor, this.options, (data: SampleData) => {
          console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
          this.sampleData.emit(data);
        });
        break;
      }
      case "get": {
        const data = await QuestionsysSensorManager.getSensorData(this.sensor, this.options);
        console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
        this.sampleData.emit(data);
        break;
      }
      case "push": {
        await QuestionsysSensorManager.pushSensorData(this.sensor, this.options, null);
        break;
      }
      default: {
        console.log("No appropriate action")
      }

    }

  }

  @Method()
  async pull(options?: any){
    return await QuestionsysSensorManager.getSensorData(this.sensor, options);
  }

  @Method()
  async push(options?: any, data?: any){
    return await QuestionsysSensorManager.pushSensorData(this.sensor, options, data);
  }

  @Method()
  async presentUiConfig(config: SensorUIConfig){
    this.uiConfig = config;
    this.configAvailable = true;
  }

  async componentDidLoad() {
    await QuestionsysSensorManager.startSensor(this.sensor, this.scope === "local" ? this.element : undefined);
    this.start();
  }


  async componentDidUnload() {
    if(this.listener != undefined) {
      this.listener.remove();
    }

    await QuestionsysSensorManager.stopSensor(this.sensor);
  }

  render() {

    if(this.configAvailable){

      const DynamicConfigComponent = this.uiConfig.component;

      return <DynamicConfigComponent {...this.uiConfig.properties}
                                     onSuccess={(data) => { this.uiConfig.success(data); this.configAvailable = false }}
                                     onError={(error) => {this.uiConfig.error(error); this.configAvailable = false}}/>

    }

    return null;
  }

}
