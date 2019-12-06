import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class AmbientTemperatureSensor extends InternalSensor{

  protected type = SensorType.AMBIENT_TEMPERATURE;

  constructor(){
    super({
      name: "ambient-temperature",
      actions: {
        watch: true
      }
    });
  }

}

const AmbientTemperature = new AmbientTemperatureSensor();
export {AmbientTemperature};
