import {Sensor} from "../../sensor";
import {Plugins, NetworkStatus, PluginListenerHandle} from "@capacitor/core";
const {Network} = Plugins;

class NetworkStatusSensor extends Sensor {

  private handler: PluginListenerHandle;

  constructor() {
    super({
      name: "network-status",
      actions: {
        get: true,
        watch: true
      }
    });
  }

  async onStop(): Promise<void> {
    if(!!this.handler){
      this.handler.remove();
    }
  }

  async onWatch(): Promise<void> {
    this.handler = Network.addListener("networkStatusChange", (status: NetworkStatus) => {
      this.onSensorDataChanged(status);
    });
  }

  async onGet() {
    return await Network.getStatus();
  }
}

const NetworkState = new NetworkStatusSensor();
export {NetworkState}

