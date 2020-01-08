import { Sensor } from "../sensor";
export class ExternalSensor extends Sensor {
    constructor(config) {
        super(config);
    }
    async start(domRef) {
        await super.start(domRef);
        try {
            await this.connect(domRef);
        }
        catch (e) {
            this.onSensorError(e);
        }
    }
    async stop() {
        try {
            await this.disconnect();
        }
        catch (e) {
            this.onSensorError(e);
        }
        await super.stop();
    }
}
