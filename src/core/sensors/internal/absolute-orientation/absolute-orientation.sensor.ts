import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class AbsoluteOrientationSensor extends InternalSensor{

  protected type = SensorType.ABSOLUTE_ORIENTATION;

  constructor(){
    super({
      name: "absolute-orientation",
      actions: {
        watch: true
      }
    });
  }

}

const AbsoluteOrientation = new AbsoluteOrientationSensor();
export {AbsoluteOrientation};
