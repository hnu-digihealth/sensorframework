import {SensorUIConfig} from "../components/sensor-configuration/sensor-configuration.component";

export interface SensorHostElement {

  presentUiConfig(config: SensorUIConfig): Promise<void>;

}
