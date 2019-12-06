import {BleSensor} from "../ble-sensor";
import {BluetoothGATTCharacteristics, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";

class BleTemperatureSensor extends BleSensor{

  protected serviceUUID = BluetoothGATTServices.HEALTH_THERMOMETER;

  protected characteristicUUID = BluetoothGATTCharacteristics.TEMPERATURE_MEASUREMENT;

  constructor(){
    super({
      name: "ble-temperature",
      actions: {
        watch: true
      }
    })
  }
}

const BleTemperature = new BleTemperatureSensor();
export {BleTemperature}
