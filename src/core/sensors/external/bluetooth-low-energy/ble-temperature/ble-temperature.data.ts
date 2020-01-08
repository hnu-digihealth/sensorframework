import {BleSensorData} from "../ble-sensor.data";

export interface BleTemperatureData extends BleSensorData{

  processed: {

    unit: string;

    temperature: number;

    timestamp?: Date;

    temperatureType?: number;

  }

}
