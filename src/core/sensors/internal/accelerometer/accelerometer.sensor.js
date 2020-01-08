import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class AccelerometerSensor extends InternalSensor {
    constructor() {
        super({
            name: "accelerometer",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.ACCELEROMETER;
    }
}
const Accelerometer = new AccelerometerSensor();
export { Accelerometer };
