import "cap-bluetooth-low-energy-client";
import { ExternalSensor } from "../external-sensor";
import { Plugins } from "@capacitor/core";
import { Callbacks } from "cap-bluetooth-low-energy-client";
const { BluetoothLEClient } = Plugins;
export class BleSensor extends ExternalSensor {
    constructor(config) {
        super(config);
    }
    async connect(domRef) {
        const host = domRef;
        const { detail } = await this.requestUserConfiguration({
            host,
            component: "ble-scan",
            properties: {
                service: this.serviceUUID
            }
        });
        this.device = detail;
        const id = this.device.id;
        await BluetoothLEClient.connect({ id });
        await BluetoothLEClient.discover({ id });
    }
    async disconnect() {
        if (this.listener != undefined) {
            this.listener.remove();
            const notificationOptions = {
                id: this.device.id,
                service: this.serviceUUID,
                characteristic: this.characteristicUUID,
            };
            await BluetoothLEClient.disableNotifications(notificationOptions);
        }
        const id = this.device.id;
        await BluetoothLEClient.disconnect({ id });
    }
    async onWatch() {
        this.listener = BluetoothLEClient.addListener(this.characteristicUUID.toString(), ({ value }) => {
            const raw = value;
            if (Callbacks[this.characteristicUUID.toString()] != undefined) {
                const processValue = Callbacks[this.characteristicUUID.toString()];
                const processed = processValue(raw);
                this.onSensorDataChanged({ processed, raw });
                return;
            }
            this.onSensorDataChanged({ raw, processed: null });
        });
        const notificationOptions = {
            id: this.device.id,
            service: this.serviceUUID,
            characteristic: this.characteristicUUID,
        };
        await BluetoothLEClient.enableNotifications(notificationOptions);
    }
    async onPull() {
        const readOptions = {
            id: this.device.id,
            service: this.serviceUUID,
            characteristic: this.characteristicUUID
        };
        const { value } = await BluetoothLEClient.read(readOptions);
        const raw = value;
        if (Callbacks[this.characteristicUUID.toString()] != undefined) {
            const processValue = Callbacks[this.characteristicUUID.toString()];
            const processed = processValue(raw);
            return { processed, raw };
        }
        return { raw };
    }
}
