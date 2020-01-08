import "cap-sensing-kit";
import {Sensor} from "../sensor";
import {SensorConfig} from "../sensor-config";
import {Plugins} from "@capacitor/core";
import {sensorChangedEventName, sensorErrorEventName} from "cap-sensing-kit";

const {SensingKit} = Plugins;


export abstract class InternalSensor extends Sensor{

  protected abstract type: string;
  private listener: any;
  private errorListener: any;

  protected constructor(config: SensorConfig){
    super(config);
  }

  protected async onWatch(options?: any): Promise<void> {

    const {isAvailable} = await SensingKit.isSensorAvailable({name: this.type});
    const {isActive} = await SensingKit.isSensorActive({name: this.type});

    if(!isAvailable){
      throw new Error(`${this.name} not available`)
    }

    if(isAvailable && !isActive){

      this.errorListener = SensingKit.addListener(sensorErrorEventName(this.type), (error) => {
        this.onSensorError(error);
      });

      this.listener = SensingKit.addListener(sensorChangedEventName(this.type), (data) => {
        this.onSensorDataChanged(data);
      });

      const sensorOptions = {
        ...options,
        name: this.type
      };

      await SensingKit.start(sensorOptions);

    }

  }

  protected async onStop(){

    await SensingKit.stop({name: this.type});

    if(this.listener != undefined){
      this.listener.remove();
    }

    if(this.errorListener != undefined){
      this.listener.remove();
    }

  }

}
