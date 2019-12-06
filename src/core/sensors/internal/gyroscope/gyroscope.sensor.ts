import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class GyroscopeSensor extends InternalSensor{

  protected type = SensorType.GYROSCOPE;

  constructor(){
    super({
      name: "gyroscope",
      actions: {
        watch: true
      }
    });
  }

}

const Gyroscope = new GyroscopeSensor();
export {Gyroscope};
