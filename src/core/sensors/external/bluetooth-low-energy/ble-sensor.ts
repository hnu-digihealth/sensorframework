import "cap-bluetooth-low-energy-client";
import {ExternalSensor} from "../external-sensor";
import {SensorConfig} from "../../sensor-config";
import {Plugins} from "@capacitor/core";
import {
  BluetoothGATTCharacteristicReadOptions,
  BluetoothGATTCharacteristics, BluetoothGATTCharacteristicWriteOptions, BluetoothGATTNotificationOptions,
  BluetoothGATTPeripheral,
  BluetoothGATTServices,
  Callbacks
} from "cap-bluetooth-low-energy-client";
import {SensorHostElement} from "../../../sensor-host-element";

const {BluetoothLEClient} = Plugins;

export abstract class BleSensor extends ExternalSensor{

  protected constructor(config: SensorConfig){
    super(config);
  }

  protected abstract serviceUUID: BluetoothGATTServices;

  protected abstract characteristicUUID: BluetoothGATTCharacteristics;

  private device: BluetoothGATTPeripheral;

  private listener: any;

  protected async connect(domRef?: SensorHostElement): Promise<void>{

    const host = domRef;

    const {detail} = await this.requestUserConfiguration({
      host,
      component: "ble-scan",
      properties: {
        service: this.serviceUUID
      }
    });

    this.device = detail;

    const id = this.device.id;

    await BluetoothLEClient.connect({id});
    await BluetoothLEClient.discover({id});
  }

  protected async disconnect(): Promise<void> {

    if(this.listener != undefined){
      this.listener.remove();

      const notificationOptions: BluetoothGATTNotificationOptions = {
        id: this.device.id,
        service: this.serviceUUID,
        characteristic: this.characteristicUUID,
      };

      await BluetoothLEClient.disableNotifications(notificationOptions);
    }

    const id = this.device.id;

    await BluetoothLEClient.disconnect({id});

  }

  protected async onWatch(): Promise<void> {

    this.listener = BluetoothLEClient.addListener(this.characteristicUUID.toString(), ({value}) => {

      const raw = value;

      if(Callbacks[this.characteristicUUID.toString()] != undefined){
        const processValue = Callbacks[this.characteristicUUID.toString()];
        const processed = processValue(raw);
        this.onSensorDataChanged({processed, raw});
        return;
      }

      this.onSensorDataChanged({raw, processed: null});
    });

    const notificationOptions: BluetoothGATTNotificationOptions = {
      id: this.device.id,
      service: this.serviceUUID,
      characteristic: this.characteristicUUID,
    };

    await BluetoothLEClient.enableNotifications(notificationOptions);

  }

  protected async onGet(): Promise<any>{

    const readOptions: BluetoothGATTCharacteristicReadOptions = {
      id: this.device.id,
      service: this.serviceUUID,
      characteristic: this.characteristicUUID
    };

    const {value} = await BluetoothLEClient.read(readOptions);
    const raw = value;

    if(Callbacks[this.characteristicUUID.toString()] != undefined){

      const processValue = Callbacks[this.characteristicUUID.toString()];
      const processed = processValue(raw);

      return {processed, raw};
    }

    return {raw};

  }

  protected async onPush(options:any = {}, data: string){

    const writeOptions: BluetoothGATTCharacteristicWriteOptions = {
      id: this.device.id,
      service: this.serviceUUID,
      characteristic: this.characteristicUUID,
      value: data
    };

    const {value} = await BluetoothLEClient.write(writeOptions);

    const raw = value;

    if(Callbacks[this.characteristicUUID.toString()] != undefined){

      const processValue = Callbacks[this.characteristicUUID.toString()];
      const processed = processValue(raw);

      return {processed, raw};
    }

    return {raw};

  }

}
