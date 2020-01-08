import { Sensor } from "../../sensor";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
class GeolocationSensor extends Sensor {
    constructor() {
        super({
            name: "geolocation",
            actions: {
                pull: true,
                watch: true
            }
        });
    }
    async onStop() {
        const id = this.callbackId;
        await Geolocation.clearWatch({ id });
    }
    async onWatch(options = {}) {
        this.callbackId = Geolocation.watchPosition(options, (data) => {
            if (data == null) {
                return;
            }
            const position = GeolocationSensor.createGeolocationData(data);
            this.onSensorDataChanged(position);
        });
    }
    async onPull(options = {}) {
        const data = await Geolocation.getCurrentPosition(options);
        return GeolocationSensor.createGeolocationData(data);
    }
    static createGeolocationData(data) {
        return {
            latitude: data.coords.latitude || null,
            longitude: data.coords.longitude || null,
            accuracy: data.coords.accuracy || null,
            altitude: data.coords.altitude || null,
            altitudeAccuracy: data.coords.altitudeAccuracy || null,
            speed: data.coords.speed || null,
            heading: data.coords.heading || null,
        };
    }
}
const Location = new GeolocationSensor();
export { Location };
