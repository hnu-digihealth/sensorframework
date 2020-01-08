import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class ProximitySensor extends InternalSensor {
    constructor() {
        super({
            name: "proximity",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.PROXIMITY;
    }
}
const Proximity = new ProximitySensor();
export { Proximity };
