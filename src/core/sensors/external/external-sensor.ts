import {Sensor} from "../sensor";
import {SensorConfig} from "../sensor-config";
import {SensorHostElement} from "../../sensor-host-element";

export abstract class ExternalSensor extends Sensor{

  protected constructor(config: SensorConfig){
    super(config);
  }

  async start(domRef?: SensorHostElement): Promise<void>{

    await super.start(domRef);

    try {
      await this.connect(domRef);
    } catch (e) {
      this.onSensorError(e);
    }

  }

  async stop(): Promise<void> {

    try{
      await this.disconnect()
    } catch (e) {
      this.onSensorError(e);
    }

    await super.stop();

  }

  protected abstract connect(domRef?: SensorHostElement): Promise<void>;

  protected abstract disconnect(): Promise<void>;

}
