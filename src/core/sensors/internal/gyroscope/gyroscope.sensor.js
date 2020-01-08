import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class GyroscopeSensor extends InternalSensor {
    constructor() {
        super({
            name: "gyroscope",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.GYROSCOPE;
    }
}
const Gyroscope = new GyroscopeSensor();
export { Gyroscope };
