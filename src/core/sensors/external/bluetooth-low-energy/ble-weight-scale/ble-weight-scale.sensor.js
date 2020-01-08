import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BleWeightScaleSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-weight-scale",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.WEIGHT_SCALE;
        this.characteristicUUID = BluetoothGATTCharacteristics.WEIGHT_MEASUREMENT;
    }
}
const BleWeightScale = new BleWeightScaleSensor();
export { BleWeightScale };
