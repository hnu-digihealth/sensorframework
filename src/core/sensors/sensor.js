import { mergeConfig } from "./sensor-config";
import { QuestionsysSensorManager } from "../sensor-manager";
export class Sensor {
    constructor(config) {
        this.state = {
            isRunning: false,
            isWatching: false,
        };
        this.listeners = {};
        this.config = mergeConfig(config);
    }
    async start(domRef) {
        if (!this.isRunning) {
            if (this.onStart == undefined) {
                this.state = Object.assign(Object.assign({}, this.state), { isRunning: true });
                return;
            }
            try {
                await this.onStart(domRef);
                this.state = Object.assign(Object.assign({}, this.state), { isRunning: true });
            }
            catch (e) {
                this.onSensorError(e);
            }
        }
    }
    async stop() {
        if (this.hasListeners("change")) {
            return;
        }
        if (this.isRunning) {
            if (this.onStop == undefined) {
                this.state = Object.assign(Object.assign({}, this.state), { isRunning: false });
                return;
            }
            try {
                await this.onStop();
            }
            catch (e) {
                this.onSensorError(e);
            }
            this.state = Object.assign(Object.assign({}, this.state), { isRunning: false });
        }
    }
    async watch(options = {}, handler) {
        if (!this.canWatch) {
            console.warn(`${this.name} does not support the following action: WATCH`);
            return;
        }
        if (this.canWatch && this.onWatch == undefined) {
            console.warn(`Missing onWatch implementation for ${this.name}`);
            return;
        }
        try {
            if (!this.isWatching) {
                await this.onWatch(options);
                this.state = Object.assign(Object.assign({}, this.state), { isWatching: true });
            }
            return this.addListener("change", handler);
        }
        catch (e) {
            this.onSensorError(e);
        }
    }
    async pull(options) {
        if (!this.canPull) {
            console.warn(`${this.name} does not support the following action: PULL`);
            return null;
        }
        if (this.canPull && this.onPull == undefined) {
            console.warn(`Missing onPull implementation for ${this.name}`);
            return null;
        }
        try {
            const data = await this.onPull(options);
            return this.createSampleData(data);
        }
        catch (e) {
            this.onSensorError(e);
        }
    }
    async push(options, data) {
        if (!this.canPush) {
            console.warn(`${this.name} does not support the following action: PUSH`);
            return;
        }
        if (this.canPush && this.onPush == undefined) {
            console.warn(`Missing onPush implementation for ${this.name}`);
            return;
        }
        try {
            return await this.onPush(options, data);
        }
        catch (e) {
            this.onSensorError(e);
        }
    }
    async getStreamData(options) {
        if (!this.canStream) {
            console.warn(`${this.name} does not support the following action: STREAM`);
            return;
        }
        if (this.canStream && this.onStream == undefined) {
            console.warn(`Missing onStream implementation for ${this.name}`);
            return null;
        }
        try {
            const data = await this.onStream(options);
            return this.createSampleData(data);
        }
        catch (e) {
            this.onSensorError(e);
        }
    }
    onError(handler) {
        return this.addListener("error", handler);
    }
    ;
    async requestUserConfiguration(config) {
        return new Promise(async (resolve, reject) => {
            const success = (data) => {
                resolve(data);
            };
            const error = (error) => {
                reject(error);
            };
            const { host } = config;
            const configuration = Object.assign({ success,
                error }, config);
            if (host !== undefined) {
                await host.presentUiConfig(configuration);
            }
            else {
                let sensorConfigManager = document.querySelector("sensor-configuration");
                if (!sensorConfigManager) {
                    sensorConfigManager = document.createElement("sensor-configuration");
                    document.body.appendChild(sensorConfigManager);
                    await sensorConfigManager.componentOnReady();
                }
                await sensorConfigManager.addConfig(configuration);
            }
        });
    }
    addListener(eventName, listener) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
        return {
            remove: () => {
                this.removeListener(eventName, listener);
            }
        };
    }
    removeListener(eventName, listener) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
            return;
        }
        const index = listeners.indexOf(listener);
        this.listeners[eventName].splice(index, 1);
    }
    hasListeners(eventName) {
        const listeners = this.listeners[eventName];
        return !(!listeners || listeners.length < 1);
    }
    onSensorDataChanged(data) {
        const toPublish = this.createSampleData(data);
        this.notify("change", toPublish);
    }
    onSensorError(error) {
        this.notify("error", error);
    }
    notify(eventName, data) {
        const listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach((listener) => listener(data));
        }
    }
    createSampleData(data) {
        return {
            data,
            timestamp: Date.now(),
            sensor: this.name
        };
    }
    get manager() {
        return QuestionsysSensorManager;
    }
    get name() {
        return this.config.name;
    }
    get canWatch() {
        return this.config.actions.watch;
    }
    get canPull() {
        return this.config.actions.pull;
    }
    get canPush() {
        return this.config.actions.push;
    }
    get canStream() {
        return this.config.actions.stream;
    }
    get isWatching() {
        return this.state.isWatching;
    }
    get isRunning() {
        return this.state.isRunning;
    }
}
