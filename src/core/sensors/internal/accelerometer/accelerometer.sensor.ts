import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class AccelerometerSensor extends InternalSensor{

  protected type = SensorType.ACCELEROMETER;

  constructor(){
    super({
      name: "accelerometer",
      actions: {
        watch: true
      }
    });
  }

}

const Accelerometer = new AccelerometerSensor();
export {Accelerometer};
