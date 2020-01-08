import "cap-sensing-kit";
import { Sensor } from "../sensor";
import { Plugins } from "@capacitor/core";
import { sensorChangedEventName } from "cap-sensing-kit";
const { SensingKit } = Plugins;
export class InternalSensor extends Sensor {
    constructor(config) {
        super(config);
    }
    async onWatch(options) {
        const { isAvailable } = await SensingKit.isSensorAvailable({ name: this.type });
        const { isActive } = await SensingKit.isSensorActive({ name: this.type });
        if (isAvailable && !isActive) {
            this.listener = SensingKit.addListener(sensorChangedEventName(this.type), (data) => {
                this.onSensorDataChanged(data);
            });
            const sensorOptions = Object.assign(Object.assign({}, options), { name: this.type });
            await SensingKit.start(sensorOptions);
        }
    }
    async onStop() {
        await SensingKit.stop({ name: this.type });
        if (this.listener != undefined) {
            this.listener.remove();
        }
    }
}
