import "@ionic/core";
import "cap-bluetooth-low-energy-client";
import {Component, h, Prop, State, Event, EventEmitter} from "@stencil/core";
import {Plugins} from "@capacitor/core";
import {BluetoothGATTPeripheral, BluetoothGATTServices} from "cap-bluetooth-low-energy-client";
import {SensorConfigElement} from "../../core/sensor-config-element";

const {BluetoothLEClient} = Plugins;

@Component({
  tag: "ble-scan",
  styleUrl: "ble-scan.styles.scss",
  shadow: true
})
export class BleScanComponent implements SensorConfigElement{

  @Prop() service: BluetoothGATTServices;

  @State() state: "initial" | "scanning" | "scan-finished" | "error" | "success" = "initial";

  @Event() success: EventEmitter<BluetoothGATTPeripheral>;

  @Event() error: EventEmitter<Error>;

  private scannedDevices: BluetoothGATTPeripheral[] = [];

  private async scan(){
    this.state = "scanning";
    try{
      const {devices} = await BluetoothLEClient.scan({services: [this.service]});
      this.scannedDevices = devices;
      this.state = "scan-finished";
    } catch (e) {
      console.log(e);
      this.state = "error";
    }
  }

  private async selectDevice(device: BluetoothGATTPeripheral) {
    this.success.emit(device);
  }

  render(){

    switch (this.state) {
      case "error": {
        return (<ion-button fill="clear" onClick={() => this.scan()}>Try Again ?</ion-button>)
      }
      case "initial": {
        return (<ion-button fill="clear" onClick={() => this.scan()}>Scan</ion-button>);
      }
      case "scanning":{
        return (<connection-spinner label="Scanning for devices nearby ..."/>);
      }
      case "scan-finished":{
        return (
          <ion-list lines="none">
            <ion-list-header>
              <ion-label>Select a device</ion-label>
            </ion-list-header>
            {
              this.scannedDevices.map((device) => {
                return <ion-item button={true} onClick={() => this.selectDevice(device)}><ion-icon name="bluetooth" slot="start"/><ion-label>{device.name}</ion-label></ion-item>
              })
            }
          </ion-list>
        );
      }
      case "success": {
        return null;
      }
      default:{
        return null;
      }

    }

  }

}

