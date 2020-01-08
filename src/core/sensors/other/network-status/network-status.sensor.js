import { Sensor } from "../../sensor";
import { Plugins } from "@capacitor/core";
const { Network } = Plugins;
class NetworkStatusSensor extends Sensor {
    constructor() {
        super({
            name: "network-status",
            actions: {
                pull: true,
                watch: true
            }
        });
    }
    async onStop() {
        if (!!this.handler) {
            this.handler.remove();
        }
    }
    async onWatch() {
        console.log(this);
        this.handler = Network.addListener("networkStatusChange", (status) => {
            this.onSensorDataChanged(status);
        });
    }
    async onPull() {
        return await Network.getStatus();
    }
}
const NetworkState = new NetworkStatusSensor();
export { NetworkState };
