import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BleHeartRateSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.HEART_RATE;

  protected characteristicUUID = BluetoothGATTCharacteristics.HEART_RATE_MEASUREMENT;

  constructor(){
    super({
      name: "ble-heart-rate",
      actions: {
        watch: true
      }
    })
  }
}

const BleHeartRate = new BleHeartRateSensor();
export {BleHeartRate}
