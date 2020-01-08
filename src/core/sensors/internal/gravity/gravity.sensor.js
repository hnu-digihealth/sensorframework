import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class GravitySensor extends InternalSensor {
    constructor() {
        super({
            name: "gravity",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.GRAVITY;
    }
}
const Gravity = new GravitySensor();
export { Gravity };
