import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class LinearAccelerationSensor extends InternalSensor{

  protected type = SensorType.LINEAR_ACCELERATION;

  constructor(){
    super({
      name: "linear-acceleration",
      actions: {
        watch: true
      }
    });
  }

}

const LinearAcceleration = new LinearAccelerationSensor();
export {LinearAcceleration};
