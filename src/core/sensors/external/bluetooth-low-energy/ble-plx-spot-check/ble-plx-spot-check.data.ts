import {BleSensorData} from "../ble-sensor.data";

export interface BlePlxSpotCheckData extends BleSensorData{

  processed: {

    spO2: number;

    pr: number;

    deviceClockNotSet: boolean;

    timestamp?: Date;

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
