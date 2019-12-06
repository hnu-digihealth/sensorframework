import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class AmbientLightSensor extends InternalSensor{

  protected type = SensorType.AMBIENT_LIGHT;

  constructor(){
    super({
      name: "ambient-light",
      actions: {
        watch: true
      }
    });
  }

}

const AmbientLight = new AmbientLightSensor();
export {AmbientLight};
