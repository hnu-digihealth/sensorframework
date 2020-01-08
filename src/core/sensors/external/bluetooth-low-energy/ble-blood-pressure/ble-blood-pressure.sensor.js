import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BleBloodPressureSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-blood-pressure",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.BLOOD_PRESSURE;
        this.characteristicUUID = BluetoothGATTCharacteristics.BLOOD_PRESSURE_MEASUREMENT;
    }
}
const BleBloodPressure = new BleBloodPressureSensor();
export { BleBloodPressure };
