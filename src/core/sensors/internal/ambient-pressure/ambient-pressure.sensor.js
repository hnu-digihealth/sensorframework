import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class AmbientPressureSensor extends InternalSensor {
    constructor() {
        super({
            name: "ambient-pressure",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.AMBIENT_PRESSURE;
    }
}
const AmbientPressure = new AmbientPressureSensor();
export { AmbientPressure };
