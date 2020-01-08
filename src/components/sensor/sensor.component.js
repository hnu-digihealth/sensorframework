var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Method, Event, Prop, Element, State, h } from "@stencil/core";
import { QuestionsysSensorManager } from "../../core/sensor-manager";
let SensorComponent = class SensorComponent {
    constructor() {
        this.scope = "global";
        this.configAvailable = false;
    }
    async pull(options) {
        return await QuestionsysSensorManager.get(this.sensor, options);
    }
    async push(options, data) {
        return await QuestionsysSensorManager.push(this.sensor, options, data);
    }
    async presentUiConfig(config) {
        this.uiConfig = config;
        this.configAvailable = true;
    }
    async componentDidLoad() {
        await QuestionsysSensorManager.start(this.sensor, this.scope === "local" ? this.element : undefined);
        switch (this.action) {
            case "watch": {
                this.listener = await QuestionsysSensorManager.watch(this.sensor, this.options, (data) => {
                    console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
                    this.sampleData.emit(data);
                });
                break;
            }
            case "get": {
                const data = await QuestionsysSensorManager.get(this.sensor, this.options);
                console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
                this.sampleData.emit(data);
                break;
            }
            case "push": {
                const data = await QuestionsysSensorManager.push(this.sensor, this.options, null);
                console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
                this.sampleData.emit(data);
                break;
            }
            case "stream": {
                const data = await QuestionsysSensorManager.stream(this.sensor, this.options);
                console.log(this.sensor.toUpperCase(), this.action.toUpperCase(), data);
                this.sampleData.emit(data);
                break;
            }
            default: {
                console.log("No appropriate action");
            }
        }
    }
    async componentDidUnload() {
        if (this.listener != undefined) {
            this.listener.remove();
        }
        await QuestionsysSensorManager.stop(this.sensor);
    }
    render() {
        if (this.configAvailable) {
            const DynamicConfigComponent = this.uiConfig.component;
            return h(DynamicConfigComponent, Object.assign({}, this.uiConfig.properties, { onSuccess: (data) => { this.uiConfig.success(data); this.configAvailable = false; }, onError: (error) => { this.uiConfig.error(error); this.configAvailable = false; } }));
        }
        return null;
    }
};
__decorate([
    Element()
], SensorComponent.prototype, "element", void 0);
__decorate([
    Prop()
], SensorComponent.prototype, "sensor", void 0);
__decorate([
    Prop()
], SensorComponent.prototype, "action", void 0);
__decorate([
    Prop()
], SensorComponent.prototype, "scope", void 0);
__decorate([
    Prop()
], SensorComponent.prototype, "options", void 0);
__decorate([
    Event()
], SensorComponent.prototype, "sampleData", void 0);
__decorate([
    State()
], SensorComponent.prototype, "configAvailable", void 0);
__decorate([
    Method()
], SensorComponent.prototype, "pull", null);
__decorate([
    Method()
], SensorComponent.prototype, "push", null);
__decorate([
    Method()
], SensorComponent.prototype, "presentUiConfig", null);
SensorComponent = __decorate([
    Component({
        tag: "sensor-element",
        shadow: true
    })
], SensorComponent);
export { SensorComponent };
