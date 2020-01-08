import {BleSensorData} from "../ble-sensor.data";

export interface BleHeartRateData extends BleSensorData{

  processed: {

    heartRate: number;

    contactDetected?: boolean;

    energyExpended?: number;

    rrIntervals?: number[];

  }

}
