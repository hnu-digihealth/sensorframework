import { BleSensor } from "../ble-sensor";
import { BluetoothGATTCharacteristics, BluetoothGATTServices } from "cap-bluetooth-low-energy-client";
class BleBodyCompositionSensor extends BleSensor {
    constructor() {
        super({
            name: "ble-body-composition",
            actions: {
                watch: true
            }
        });
        this.serviceUUID = BluetoothGATTServices.BODY_COMPOSITION;
        this.characteristicUUID = BluetoothGATTCharacteristics.BODY_COMPOSITION_MEASUREMENT;
    }
}
const BleBodyComposition = new BleBodyCompositionSensor();
export { BleBodyComposition };
