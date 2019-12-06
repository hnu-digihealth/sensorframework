import "cap-sensing-kit";
import {Sensor} from "../sensor";
import {SensorConfig} from "../sensor-config";
import {Plugins} from "@capacitor/core";
import {sensorChangedEventName} from "cap-sensing-kit";

const {SensingKit} = Plugins;


export abstract class InternalSensor extends Sensor{

  protected abstract type: string;
  private listener: any;

  protected constructor(config: SensorConfig){
    super(config);
  }

  protected async onWatch(options?: any): Promise<void> {

    const {isAvailable} = await SensingKit.isSensorAvailable({name: this.type});
    const {isActive} = await SensingKit.isSensorActive({name: this.type});

    if(isAvailable && !isActive){

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

  }

}
