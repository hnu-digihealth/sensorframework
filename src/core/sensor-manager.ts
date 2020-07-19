import {ListenerCallback, Sensor, SensorListenerHandle} from "./sensors/sensor";
import {ISensorRegistry} from "./sensor-registry";
import {SampleData} from "./sensors/sample-data";
import {SensorHostElement} from "./sensor-host-element";


class SensorManager {

  constructor(private registry: ISensorRegistry){}

  public async start(sensorId: string, domRef?: SensorHostElement): Promise<void> {

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      await sensor.start(domRef);
    }

  }

  public async stop(sensorId: string): Promise<void>{

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      await sensor.stop();
    }

  }

  public async get(sensorId: string, options: any = {}): Promise<SampleData> {

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      return await sensor.get(options);
    }
    return null;
  }

  public async watch(sensorId: string, options: any = {}, onChange: (data: SampleData) => void): Promise<SensorListenerHandle>{

    const sensor = this.getSensor(sensorId);

    if(sensor != null) {
      return await sensor.watch(options, onChange);
    }
    return null;
  }

  public async push(sensorId: string, options: any = {}, data: any): Promise<any>{

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      return await sensor.push(options, data);
    }

    return null;

  };

  public async record(sensorId: string, options: any = {}): Promise<string> {

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      return await sensor.record(options);
    }

    return null;
  }

  public getRecording(sensorId: string, recordingId: string): File {
    const sensor = this.getSensor(sensorId);

    if(sensor != null && sensor.getRecording != undefined){
      return sensor.getRecording(recordingId);
    }

    return null;
  }

  public async onSensorError(sensorId: string, onError: ListenerCallback<Error>): Promise<SensorListenerHandle> {

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      return await sensor.onError(onError);
    }

    return null;

  }

  public registerSensor<T extends Sensor>(sensor: T): void {

    if(!(sensor instanceof Sensor)){
      throw new Error("Sensors must inherit from Sensor base class");
    }

    this.registry.registerSensor(sensor);
  }

  private getSensor(id: string): Sensor | null {
    return this.registry.getSensor(id) || null;
  }

}

import {SensorFrameworkRegistry} from "./sensor-registry";


export const SensorFrameworkManager = new SensorManager(SensorFrameworkRegistry);
