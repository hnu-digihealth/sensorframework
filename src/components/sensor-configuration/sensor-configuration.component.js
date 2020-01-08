var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, h, Method, Element, State } from "@stencil/core";
import "@ionic/core";
let SensorConfigurationComponent = class SensorConfigurationComponent {
    constructor() {
        this.configQueue = [];
        this.currentIndex = 0;
    }
    async addConfig(toAdd) {
        this.configQueue = [...this.configQueue, toAdd];
    }
    async componentDidLoad() {
    }
    async componentDidUnload() {
        for (let i = this.currentIndex; i < this.configQueue.length; i++) {
            this.configQueue[i].error(new Error("User configuration was canceled"));
        }
    }
    dismiss() {
        const parent = this.element.parentElement;
        parent.removeChild(this.element);
    }
    async next() {
        const isEnd = await this.slides.isEnd();
        if (isEnd) {
            this.dismiss();
            return;
        }
        await this.slides.lockSwipes(false);
        await this.slides.slideNext();
        await this.slides.lockSwipes(true);
        this.currentIndex = await this.slides.getActiveIndex();
    }
    async onConfigSuccess(item, data) {
        item.success(data);
        await this.next();
    }
    onConfigError(item, error) {
        item.error(error);
    }
    async skip() {
        const current = this.configQueue[this.currentIndex];
        current.error(new Error('User skipped sensor configuration'));
        await this.next();
    }
    render() {
        if (!this.configQueue.length) {
            return "...";
        }
        return [
            h("div", { class: "overlay-background" }),
            h("div", { class: "config-wrapper" },
                h("h3", { class: "title" }, "Configuration"),
                h("ion-slides", { ref: (element) => this.slides = element, pager: true, options: { allowSlidePrev: false, allowSlideNext: false } }, this.configQueue.map((item) => {
                    const DynamicConfigComponent = item.component;
                    return (h("ion-slide", null,
                        h(DynamicConfigComponent, Object.assign({}, item.properties, { class: "config-item", onSuccess: (data) => this.onConfigSuccess(item, data), onError: (error) => this.onConfigError(item, error) }))));
                })),
                h("ion-button", { fill: "clear", class: "btn-cancel", onClick: () => this.dismiss() }, "Cancel"),
                h("ion-button", { fill: "clear", class: "btn-skip", onClick: () => this.skip() }, "Skip"))
        ];
    }
};
__decorate([
    Element()
], SensorConfigurationComponent.prototype, "element", void 0);
__decorate([
    State()
], SensorConfigurationComponent.prototype, "configQueue", void 0);
__decorate([
    State()
], SensorConfigurationComponent.prototype, "currentIndex", void 0);
__decorate([
    Method()
], SensorConfigurationComponent.prototype, "addConfig", null);
SensorConfigurationComponent = __decorate([
    Component({
        tag: "sensor-configuration",
        styleUrl: "sensor-configuration.styles.scss",
        shadow: true
    })
], SensorConfigurationComponent);
export { SensorConfigurationComponent };
