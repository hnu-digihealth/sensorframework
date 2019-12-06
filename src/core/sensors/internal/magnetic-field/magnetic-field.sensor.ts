import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class MagneticFieldSensor extends InternalSensor{

  protected type = SensorType.MAGNETIC_FIELD;

  constructor(){
    super({
      name: "magnetic-field",
      actions: {
        watch: true
      }
    });
  }

}

const MagneticField = new MagneticFieldSensor();
export {MagneticField};
