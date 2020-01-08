import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class AmbientTemperatureSensor extends InternalSensor {
    constructor() {
        super({
            name: "ambient-temperature",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.AMBIENT_TEMPERATURE;
    }
}
const AmbientTemperature = new AmbientTemperatureSensor();
export { AmbientTemperature };
