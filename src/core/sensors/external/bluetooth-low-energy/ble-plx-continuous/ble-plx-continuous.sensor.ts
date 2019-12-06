import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BlePlxContinuousSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.PULSE_OXIMETER;

  protected characteristicUUID = BluetoothGATTCharacteristics.PLX_CONTINUOUS_MEASUREMENT;

  constructor(){
    super({
      name: "ble-plx-continuous",
      actions: {
        watch: true
      }
    })
  }
}

const BlePlxContinuous = new BlePlxContinuousSensor();
export {BlePlxContinuous}
