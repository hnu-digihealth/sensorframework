import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class AmbientPressureSensor extends InternalSensor{

  protected type = SensorType.AMBIENT_PRESSURE;

  constructor(){
    super({
      name: "ambient-pressure",
      actions: {
        watch: true
      }
    });
  }

}

const AmbientPressure = new AmbientPressureSensor();
export {AmbientPressure};
