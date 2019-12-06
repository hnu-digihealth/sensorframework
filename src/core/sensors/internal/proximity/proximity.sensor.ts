import {InternalSensor} from "../internal-sensor";
import {SensorType} from "cap-sensing-kit";

class ProximitySensor extends InternalSensor{

  protected type = SensorType.PROXIMITY;

  constructor(){
    super({
      name: "proximity",
      actions: {
        watch: true
      }
    });
  }

}

const Proximity = new ProximitySensor();
export {Proximity};
