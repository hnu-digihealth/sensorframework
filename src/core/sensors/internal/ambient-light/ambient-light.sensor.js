import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class AmbientLightSensor extends InternalSensor {
    constructor() {
        super({
            name: "ambient-light",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.AMBIENT_LIGHT;
    }
}
const AmbientLight = new AmbientLightSensor();
export { AmbientLight };
