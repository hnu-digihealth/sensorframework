/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  BluetoothGATTPeripheral,
  BluetoothGATTServices,
} from 'cap-bluetooth-low-energy-client';
import {
  SensorUIConfig,
} from './components/sensor-configuration/sensor-configuration.component';
import {
  SampleData,
} from './core/sensors/sample-data';
import {
  SensorUIConfig as SensorUIConfig1,
} from './components/sensor-configuration/sensor-configuration.component';

export namespace Components {
  interface BleScan {
    'service': BluetoothGATTServices;
  }
  interface ConnectionSpinner {
    'direction': "top" | "bottom" | "left" | "right";
    'label': string;
  }
  interface SensorConfiguration {
    'addConfig': (toAdd: SensorUIConfig) => Promise<void>;
  }
  interface SensorElement {
    'action': "watch" | "get" | "push" | "record";
    'options': any;
    'presentUiConfig': (config: SensorUIConfig) => Promise<void>;
    'pull': (options?: any) => Promise<SampleData<any>>;
    'push': (options?: any, data?: any) => Promise<any>;
    'scope': "global" | "local";
    'sensor': string;
  }
  interface SensorList {}
}

declare global {


  interface HTMLBleScanElement extends Components.BleScan, HTMLStencilElement {}
  const HTMLBleScanElement: {
    prototype: HTMLBleScanElement;
    new (): HTMLBleScanElement;
  };

  interface HTMLConnectionSpinnerElement extends Components.ConnectionSpinner, HTMLStencilElement {}
  const HTMLConnectionSpinnerElement: {
    prototype: HTMLConnectionSpinnerElement;
    new (): HTMLConnectionSpinnerElement;
  };

  interface HTMLSensorConfigurationElement extends Components.SensorConfiguration, HTMLStencilElement {}
  const HTMLSensorConfigurationElement: {
    prototype: HTMLSensorConfigurationElement;
    new (): HTMLSensorConfigurationElement;
  };

  interface HTMLSensorElementElement extends Components.SensorElement, HTMLStencilElement {}
  const HTMLSensorElementElement: {
    prototype: HTMLSensorElementElement;
    new (): HTMLSensorElementElement;
  };

  interface HTMLSensorListElement extends Components.SensorList, HTMLStencilElement {}
  const HTMLSensorListElement: {
    prototype: HTMLSensorListElement;
    new (): HTMLSensorListElement;
  };
  interface HTMLElementTagNameMap {
    'ble-scan': HTMLBleScanElement;
    'connection-spinner': HTMLConnectionSpinnerElement;
    'sensor-configuration': HTMLSensorConfigurationElement;
    'sensor-element': HTMLSensorElementElement;
    'sensor-list': HTMLSensorListElement;
  }
}

declare namespace LocalJSX {
  interface BleScan {
    'onError'?: (event: CustomEvent<Error>) => void;
    'onSuccess'?: (event: CustomEvent<BluetoothGATTPeripheral>) => void;
    'service'?: BluetoothGATTServices;
  }
  interface ConnectionSpinner {
    'direction'?: "top" | "bottom" | "left" | "right";
    'label'?: string;
  }
  interface SensorConfiguration {}
  interface SensorElement {
    'action'?: "watch" | "get" | "push" | "record";
    'onError'?: (event: CustomEvent<Error>) => void;
    'onSampleData'?: (event: CustomEvent<SampleData>) => void;
    'options'?: any;
    'scope'?: "global" | "local";
    'sensor'?: string;
  }
  interface SensorList {}

  interface IntrinsicElements {
    'ble-scan': BleScan;
    'connection-spinner': ConnectionSpinner;
    'sensor-configuration': SensorConfiguration;
    'sensor-element': SensorElement;
    'sensor-list': SensorList;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'ble-scan': LocalJSX.BleScan & JSXBase.HTMLAttributes<HTMLBleScanElement>;
      'connection-spinner': LocalJSX.ConnectionSpinner & JSXBase.HTMLAttributes<HTMLConnectionSpinnerElement>;
      'sensor-configuration': LocalJSX.SensorConfiguration & JSXBase.HTMLAttributes<HTMLSensorConfigurationElement>;
      'sensor-element': LocalJSX.SensorElement & JSXBase.HTMLAttributes<HTMLSensorElementElement>;
      'sensor-list': LocalJSX.SensorList & JSXBase.HTMLAttributes<HTMLSensorListElement>;
    }
  }
}


