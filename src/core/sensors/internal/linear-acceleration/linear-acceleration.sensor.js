import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class LinearAccelerationSensor extends InternalSensor {
    constructor() {
        super({
            name: "linear-acceleration",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.LINEAR_ACCELERATION;
    }
}
const LinearAcceleration = new LinearAccelerationSensor();
export { LinearAcceleration };
