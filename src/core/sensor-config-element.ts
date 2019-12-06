import {EventEmitter} from "@stencil/core";

export interface SensorConfigElement {

  success: EventEmitter<any>;

  error: EventEmitter<Error>;

}
