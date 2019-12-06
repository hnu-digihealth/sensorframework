import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BleBloodPressureSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.BLOOD_PRESSURE;

  protected characteristicUUID = BluetoothGATTCharacteristics.BLOOD_PRESSURE_MEASUREMENT;

  constructor(){
    super({
      name: "ble-blood-pressure",
      actions: {
        watch: true
      }
    })
  }
}

const BleBloodPressure = new BleBloodPressureSensor();
export {BleBloodPressure}
