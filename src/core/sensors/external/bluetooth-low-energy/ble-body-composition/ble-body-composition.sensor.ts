import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BleBodyCompositionSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.BODY_COMPOSITION;

  protected characteristicUUID = BluetoothGATTCharacteristics.BODY_COMPOSITION_MEASUREMENT;

  constructor(){
    super({
      name: "ble-body-composition",
      actions: {
        watch: true
      }
    })
  }
}

const BleBodyComposition = new BleBodyCompositionSensor();
export {BleBodyComposition};
