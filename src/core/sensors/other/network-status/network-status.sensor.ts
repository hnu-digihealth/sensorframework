import {Sensor} from "../../sensor";
import {Plugins, NetworkStatus, PluginListenerHandle} from "@capacitor/core";
const {Network} = Plugins;

class NetworkStatusSensor extends Sensor {

  private handler: PluginListenerHandle;

  constructor() {
    super({
      name: "network-status",
      actions: {
        pull: true,
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
    console.log(this);
    this.handler = Network.addListener("networkStatusChange", (status: NetworkStatus) => {
      this.onSensorDataChanged(status);
    });
  }

  async onPull() {
    return await Network.getStatus();
  }
}

const NetworkState = new NetworkStatusSensor();
export {NetworkState}

