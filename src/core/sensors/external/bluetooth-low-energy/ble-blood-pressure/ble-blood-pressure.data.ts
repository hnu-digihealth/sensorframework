import {BleSensorData} from "../ble-sensor.data";

export interface BleBloodPressureData extends BleSensorData{
  processed : {
    unit: string,
    compoundValue: {
      systolic: number,
      diastolic: number,
      meanArterialPressure: number
    },
    timestamp?: Date,
    pulse?: number,
    userId?: number,
    status?: {
      bodyMovement: boolean,
      cuffTooLose: boolean,
      irregularPulse: boolean,
      pulseRateRange: number,
      improperPosition: boolean
    }
  }
}
