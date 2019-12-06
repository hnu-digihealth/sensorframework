import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class RelativeHumiditySensor extends InternalSensor{

  protected type = SensorType.RELATIVE_HUMIDITY;

  constructor(){
    super({
      name: "relative-humidity",
      actions: {
        watch: true
      }
    });
  }

}

const RelativeHumidity = new RelativeHumiditySensor();
export {RelativeHumidity};
