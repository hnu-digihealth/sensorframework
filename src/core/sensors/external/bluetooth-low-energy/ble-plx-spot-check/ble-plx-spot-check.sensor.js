import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BlePlxSpotCheckSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-plx-spot-check",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.PULSE_OXIMETER;
        this.characteristicUUID = BluetoothGATTCharacteristics.PLX_SPOT_CHECK_MEASUREMENT;
    }
}
const BlePlxSpotCheck = new BlePlxSpotCheckSensor();
export { BlePlxSpotCheck };
