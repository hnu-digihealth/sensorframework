import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BleTemperatureSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-temperature",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.HEALTH_THERMOMETER;
        this.characteristicUUID = BluetoothGATTCharacteristics.TEMPERATURE_MEASUREMENT;
    }
}
const BleTemperature = new BleTemperatureSensor();
export { BleTemperature };
