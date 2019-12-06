import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class GravitySensor extends InternalSensor{

  protected type = SensorType.GRAVITY;

  constructor(){
    super({
      name: "gravity",
      actions: {
        watch: true
      }
    });
  }

}

const Gravity = new GravitySensor();
export {Gravity};
