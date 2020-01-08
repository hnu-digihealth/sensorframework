import { InternalSensor } from "../internal-sensor";
import { SensorType } from "cap-sensing-kit";
class RelativeHumiditySensor extends InternalSensor {
    constructor() {
        super({
            name: "relative-humidity",
            actions: {
                watch: true
            }
        });
        this.type = SensorType.RELATIVE_HUMIDITY;
    }
}
const RelativeHumidity = new RelativeHumiditySensor();
export { RelativeHumidity };
