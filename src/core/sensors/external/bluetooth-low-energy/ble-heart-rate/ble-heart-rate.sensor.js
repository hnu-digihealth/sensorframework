import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BleHeartRateSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-heart-rate",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.HEART_RATE;
        this.characteristicUUID = BluetoothGATTCharacteristics.HEART_RATE_MEASUREMENT;
    }
}
const BleHeartRate = new BleHeartRateSensor();
export { BleHeartRate };
