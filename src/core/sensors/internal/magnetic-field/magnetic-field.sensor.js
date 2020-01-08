import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class MagneticFieldSensor extends InternalSensor {
    constructor() {
        super({
            name: "magnetic-field",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.MAGNETIC_FIELD;
    }
}
const MagneticField = new MagneticFieldSensor();
export { MagneticField };
