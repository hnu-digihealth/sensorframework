var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Prop } from "@stencil/core";
import "@ionic/core";
let BleConnectionSpinnerComponent = class BleConnectionSpinnerComponent {
    constructor() {
        this.direction = "right";
    }
    render() {
        return (h("host", { class: `spinner-direction-${this.direction}` },
            h("div", { class: "outer" },
                h("div", { class: "middle" },
                    h("div", { class: "inner" }))),
            h("ion-icon", { name: "bluetooth" })));
    }
};
__decorate([
    Prop()
], BleConnectionSpinnerComponent.prototype, "direction", void 0);
__decorate([
    Prop()
], BleConnectionSpinnerComponent.prototype, "label", void 0);
BleConnectionSpinnerComponent = __decorate([
    Component({
        tag: "connection-spinner",
        styleUrl: "ble-connection-spinner.styles.scss",
        shadow: true
    })
], BleConnectionSpinnerComponent);
export { BleConnectionSpinnerComponent };
