import {BleSensorData} from "../ble-sensor.data";

export interface BleWeightScaleData extends BleSensorData{

  processed: {

    units: {

      weight: string;

      height: string;

    };

    weight: number;

    timestamp?: Date;

    userId?: number;

    bmi?: number;

    height?: number;

  }

}
