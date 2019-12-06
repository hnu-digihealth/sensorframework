import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class RelativeOrientationSensor extends InternalSensor{

  protected type = SensorType.RELATIVE_ORIENTATION;

  constructor(){
    super({
      name: "relative-orientation",
      actions: {
        watch: true
      }
    });
  }

}

const RelativeOrientation = new RelativeOrientationSensor();
export {RelativeOrientation};
