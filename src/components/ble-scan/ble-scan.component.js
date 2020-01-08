var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "@ionic/core";
import "cap-bluetooth-low-energy-client";
import { Component, h, Prop, State, Event } from "@stencil/core";
import { Plugins } from "@capacitor/core";
const { BluetoothLEClient } = Plugins;
let BleScanComponent = class BleScanComponent {
    constructor() {
        this.state = "initial";
        this.scannedDevices = [];
    }
    async scan() {
        this.state = "scanning";
        try {
            const { devices } = await BluetoothLEClient.scan({ services: [this.service] });
            this.scannedDevices = devices;
            this.state = "scan-finished";
        }
        catch (e) {
            console.log(e);
            this.state = "error";
        }
    }
    async selectDevice(device) {
        this.success.emit(device);
    }
    render() {
        switch (this.state) {
            case "error": {
                return (h("ion-button", { fill: "clear", onClick: () => this.scan() }, "Try Again ?"));
            }
            case "initial": {
                return (h("ion-button", { fill: "clear", onClick: () => this.scan() }, "Scan"));
            }
            case "scanning": {
                return (h("connection-spinner", { label: "Scanning for devices nearby ..." }));
            }
            case "scan-finished": {
                return (h("ion-list", { lines: "none" },
                    h("ion-list-header", null,
                        h("ion-label", null, "Select a device")),
                    this.scannedDevices.map((device) => {
                        return h("ion-item", { button: true, onClick: () => this.selectDevice(device) },
                            h("ion-icon", { name: "bluetooth", slot: "start" }),
                            h("ion-label", null, device.name));
                    })));
            }
            case "success": {
                return null;
            }
            default: {
                return null;
            }
        }
    }
};
__decorate([
    Prop()
], BleScanComponent.prototype, "service", void 0);
__decorate([
    State()
], BleScanComponent.prototype, "state", void 0);
__decorate([
    Event()
], BleScanComponent.prototype, "success", void 0);
__decorate([
    Event()
], BleScanComponent.prototype, "error", void 0);
BleScanComponent = __decorate([
    Component({
        tag: "ble-scan",
        styleUrl: "ble-scan.styles.scss",
        shadow: true
    })
], BleScanComponent);
export { BleScanComponent };
