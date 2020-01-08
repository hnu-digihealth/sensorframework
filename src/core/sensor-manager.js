import { Sensor } from "./sensors/sensor";
class SensorManager {
    constructor(registry) {
        this.registry = registry;
    }
    async start(sensorId, domRef) {
        const sensor = this.getSensor(sensorId);
        if (sensor != null) {
            await sensor.start(domRef);
        }
    }
    async stop(sensorId) {
        const sensor = this.getSensor(sensorId);
        if (sensor != null) {
            await sensor.stop();
        }
    }
    async get(sensorId, options) {
        const sensor = this.getSensor(sensorId);
        if (sensor != null) {
            return await sensor.pull(options);
        }
        return null;
    }
    async watch(sensorId, options, onChange) {
        const sensor = this.getSensor(sensorId);
        if (sensor != null) {
            return await sensor.watch(options, onChange);
        }
        return null;
    }
    async push(sensorId, options, data) {
        const sensor = this.getSensor(sensorId);
        if (sensor != null) {
            return await sensor.push(options, data);
        }
        return null;
    }
    ;
    async stream(sensorId, options) {
        const sensor = this.getSensor(sensorId);
        if (sensor != null) {
            return await sensor.getStreamData(options);
        }
        return null;
    }
    registerSensor(sensor) {
        if (!(sensor instanceof Sensor)) {
            throw new Error("Sensors must inherit from Sensor base class");
        }
        this.registry.registerSensor(sensor);
    }
    getSensor(id) {
        return this.registry.getSensor(id) || null;
    }
}
import { QuestionSysSensorRegistry } from "./sensor-registry";
export const QuestionsysSensorManager = new SensorManager(QuestionSysSensorRegistry);
