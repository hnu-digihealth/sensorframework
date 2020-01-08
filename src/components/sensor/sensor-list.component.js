var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h } from "@stencil/core";
import "cap-media-recorder";
import { Plugins } from "@capacitor/core";
const { MediaRecorder } = Plugins;
let SensorListComponent = class SensorListComponent {
    async componentDidLoad() {
    }
    async start() {
        const element = document.getElementById(this.id);
        if (element) {
            document.body.removeChild(element);
        }
        const { id } = await MediaRecorder.startRecording({ name: "test", video: true, audio: true });
        this.id = id;
        const preview = await MediaRecorder.getPreview({ id });
        const video = document.createElement("video");
        video.id = id;
        video.srcObject = preview;
        document.body.appendChild(video);
        await video.play();
    }
    async stop() {
        const element = document.getElementById(this.id);
        if (element) {
            document.body.removeChild(element);
        }
        const file = await MediaRecorder.stopRecording({ id: this.id });
        const video = document.createElement("video");
        video.src = window.URL.createObjectURL(file);
        video.controls = true;
        video.id = this.id;
        document.body.appendChild(video);
    }
    render() {
        return [
            h("ion-button", { onClick: () => this.start() }, "Start"),
            h("ion-button", { onClick: () => this.stop() }, "Stop"),
            h("sensor-element", { sensor: "ble-temperature", action: "watch" }),
            h("sensor-element", { sensor: "ble-blood-pressure", action: "watch" }),
            h("sensor-element", { sensor: "ble-weight-scale", action: "watch" }),
        ];
    }
};
SensorListComponent = __decorate([
    Component({
        tag: "sensor-list",
        shadow: true
    })
], SensorListComponent);
export { SensorListComponent };
