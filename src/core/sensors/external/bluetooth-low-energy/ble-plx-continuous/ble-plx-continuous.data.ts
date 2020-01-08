import {BleSensorData} from "../ble-sensor.data";

export interface BlePlxContinuousData extends BleSensorData{

  processed: {

    spO2: number;

    pr: number;

    spO2Fast?: number;

    prFast?: number;

    spO2Slow?: number;

    prSlow?: number;

    measurementStatus?: {

      measurementOngoing: boolean,

      earlyEstimatedData: boolean,

      validatedData: boolean,

      fullyQualifiedData: boolean,

      dataFromMeasurementStorage: boolean,

      dataForDemonstration: boolean,

      dataForTesting: boolean,

      calibrationOngoing: boolean,

      measurementUnavailable: boolean,

      questionablePulseDetected: boolean,

      invalidMeasurementDetected: boolean

    };

    deviceAndSensorStatus?: {

      extendedDisplayUpdateOngoing: boolean,

      equipmentMalfunctionDetected: boolean,

      signalProcessingIrregularityDetected: boolean,

      inadequiteSignalDetected: boolean,

      poorSignalDetected: boolean,

      lowPerfusionDetected: boolean,

      erraticSignalDetected: boolean,

      nonpulsatileSignalDetected: boolean,

      questionablePulseDetected: boolean,

      signalAnalysisOngoing: boolean,

      sensorInterfaceDetected: boolean,

      sensorUnconnectedToUser: boolean,

      unknownSensorConnected: boolean,

      sensorDisplaced: boolean,

      sensorMalfunctioning: boolean,

      sensorDisconnected: boolean

    };

    pulseAmplitudeIndex?: number;

  }

}
