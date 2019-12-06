import {Sensor, SensorListenerHandle} from "./sensors/sensor";
import {SensorRegistry} from "./sensor-registry";
import {SampleData} from "./sensors/sample-data";
import {SensorHostElement} from "./sensor-host-element";


class SensorManager {

  constructor(private registry: SensorRegistry){}

  public async startSensor(sensorId: string, domRef?: SensorHostElement): Promise<void> {

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      await sensor.start(domRef);
    }

  }

  public async stopSensor(sensorId: string): Promise<void>{

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      await sensor.stop();
    }

  }

  public async getSensorData(sensorId: string, options?: any): Promise<SampleData> {

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      return await sensor.pull(options);
    }
    return null;
  }

  public async watchSensorData(sensorId: string, options: any, onChange: (data: SampleData) => void): Promise<SensorListenerHandle>{

    const sensor = this.getSensor(sensorId);

    if(sensor != null) {
      return await sensor.watch(options, onChange);
    }
    return null;
  }

  public async pushSensorData(sensorId: string, options: any, data: any): Promise<any>{

    const sensor = this.getSensor(sensorId);

    if(sensor != null){
      return await sensor.push(options, data);
    }

    return null;

  };

  public registerSensor<T extends Sensor>(sensor: T): void {

    if(!(sensor instanceof Sensor)){
      throw new Error("Sensors must inherit from Sensor base class");
    }

    this.registry[sensor.name] = sensor;
  }

  private isSensorAvailable(id: string): boolean {
    return !!this.registry[id];
  }

  private getSensor(id: string): Sensor {

    if(this.isSensorAvailable(id)){
      return this.registry[id];
    }

    return null;
  }

}

import {QuestionSysSensorRegistry} from "./sensor-registry";


export const QuestionsysSensorManager = new SensorManager(QuestionSysSensorRegistry);
