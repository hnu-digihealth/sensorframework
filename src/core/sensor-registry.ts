import {
  NetworkState,
  Location,
  BleBloodPressure,
  BleBodyComposition,
  BleHeartRate,
  BlePlxContinuous,
  BlePlxSpotCheck,
  BleTemperature,
  BleWeightScale,
  AbsoluteOrientation,
  Accelerometer,
  AmbientLight,
  AmbientPressure,
  AmbientTemperature,
  Gravity,
  Gyroscope,
  LinearAcceleration,
  MagneticField,
  Proximity,
  RelativeHumidity,
  RelativeOrientation,
  Http
} from "./sensors";
import {Sensor} from "./sensors/sensor";

interface SensorRegistry{
 [id:string]: Sensor;
}

const QuestionSysSensorRegistry: SensorRegistry = {
  [AbsoluteOrientation.name]: AbsoluteOrientation,
  [Accelerometer.name]: Accelerometer,
  [AmbientLight.name]: AmbientLight,
  [AmbientPressure.name]: AmbientPressure,
  [AmbientTemperature.name]: AmbientTemperature,
  [Gravity.name]: Gravity,
  [Gyroscope.name]: Gyroscope,
  [MagneticField.name]: MagneticField,
  [LinearAcceleration.name]: LinearAcceleration,
  [Proximity.name]: Proximity,
  [RelativeHumidity.name]: RelativeHumidity,
  [RelativeOrientation.name]: RelativeOrientation,
  [NetworkState.name]: NetworkState,
  [Location.name]: Location,
  [BleBloodPressure.name]: BleBloodPressure,
  [BleBodyComposition.name]: BleBodyComposition,
  [BleHeartRate.name]: BleHeartRate,
  [BlePlxContinuous.name]: BlePlxContinuous,
  [BlePlxSpotCheck.name]: BlePlxSpotCheck,
  [BleTemperature.name]: BleTemperature,
  [BleWeightScale.name]: BleWeightScale,
  [Http.name]: Http
};

export {SensorRegistry, QuestionSysSensorRegistry}
