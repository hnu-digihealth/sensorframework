import {Sensor} from "../../sensor";
import {Plugins, GeolocationOptions, GeolocationPosition} from "@capacitor/core";
import {GeolocationData} from "./geolocation.data";
const {Geolocation} = Plugins;

class GeolocationSensor extends Sensor{

  private callbackId: string;

  constructor() {
    super({
      name: "geolocation",
      actions: {
        get: true,
        watch: true
      }
    });
  }

  protected async onStop(): Promise<void> {
    const id = this.callbackId;
    await Geolocation.clearWatch({id});
  }

   async onWatch(options: GeolocationOptions = {}): Promise<void> {

    this.callbackId = Geolocation.watchPosition(options, (data) => {

      if (data == null) {
        return;
      }

      const position: GeolocationData = GeolocationSensor.createGeolocationData(data);
      this.onSensorDataChanged(position);
    });


  }

  protected async onGet(options: GeolocationOptions = {}) {
    const data = await Geolocation.getCurrentPosition(options);
    return GeolocationSensor.createGeolocationData(data);
  }

  private static createGeolocationData(data: GeolocationPosition): GeolocationData {
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
export {Location}

