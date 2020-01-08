import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class RelativeOrientationSensor extends InternalSensor {
    constructor() {
        super({
            name: "relative-orientation",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.RELATIVE_ORIENTATION;
    }
}
const RelativeOrientation = new RelativeOrientationSensor();
export { RelativeOrientation };
