import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BlePlxContinuousSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-plx-continuous",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.PULSE_OXIMETER;
        this.characteristicUUID = BluetoothGATTCharacteristics.PLX_CONTINUOUS_MEASUREMENT;
    }
}
const BlePlxContinuous = new BlePlxContinuousSensor();
export { BlePlxContinuous };
