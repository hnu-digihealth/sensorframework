import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class AbsoluteOrientationSensor extends InternalSensor {
    constructor() {
        super({
            name: "absolute-orientation",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.ABSOLUTE_ORIENTATION;
    }
}
const AbsoluteOrientation = new AbsoluteOrientationSensor();
export { AbsoluteOrientation };
