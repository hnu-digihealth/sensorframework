import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BlePlxSpotCheckSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.PULSE_OXIMETER;

  protected characteristicUUID = BluetoothGATTCharacteristics.PLX_SPOT_CHECK_MEASUREMENT;

  constructor(){
    super({
      name: "ble-plx-spot-check",
      actions: {
        watch: true
      }
    })
  }
}

const BlePlxSpotCheck = new BlePlxSpotCheckSensor();
export {BlePlxSpotCheck}
