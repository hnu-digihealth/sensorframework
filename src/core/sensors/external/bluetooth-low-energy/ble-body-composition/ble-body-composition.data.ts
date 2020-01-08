import {BleSensorData} from "../ble-sensor.data";

export interface BleBodyCompositionData extends BleSensorData{

  processed: {

    units: {weight: string, height: string};

    bodyFatPercentage: number;

    timestamp?: Date;

    userId?: number;

    basalMetabolism?: number;

    musclePercentage?: number;

    muscleMass?: number;

    fatFreeMass?: number;

    softLeanMass?: number;

    bodyWaterMass?: number;

    impedance?: number;

    weight?: number;

    height?: number;

    multiplePackageMeasurement: boolean;

  }

}
