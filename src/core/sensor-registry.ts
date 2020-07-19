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
  Http,
  Microphone,
  VideoRecorder
} from "./sensors";
import {Sensor} from "./sensors/sensor";

interface ISensorRegistry {

  getSensor(name: string): Sensor;

  isSensorAvailable(name: string): boolean;

  registerSensor(sensor: Sensor): void;

}

class SensorRegistry implements ISensorRegistry{

  private registry: { [name: string]: Sensor } = {
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
    [Http.name]: Http,
    [Microphone.name]: Microphone,
    [VideoRecorder.name]: VideoRecorder
  };

  public getSensor(name: string): Sensor {
    return this.registry[name];
  }

  public isSensorAvailable(name: string) {
    return this.registry[name] !== undefined;
  }

  public registerSensor(sensor: Sensor): void {
    this.registry[sensor.name] = sensor;
  }

}

const SensorFrameworkRegistry: ISensorRegistry = new SensorRegistry();
export {ISensorRegistry, SensorFrameworkRegistry}
