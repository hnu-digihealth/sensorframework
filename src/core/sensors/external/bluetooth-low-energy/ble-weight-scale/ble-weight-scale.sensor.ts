import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BleWeightScaleSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.WEIGHT_SCALE;

  protected characteristicUUID = BluetoothGATTCharacteristics.WEIGHT_MEASUREMENT;

  constructor(){
    super({
      name: "ble-weight-scale",
      actions: {
        watch: true
      }
    })
  }
}

const BleWeightScale = new BleWeightScaleSensor();
export {BleWeightScale}
