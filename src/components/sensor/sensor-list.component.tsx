import {Component, h} from "@stencil/core";


@Component({
  tag: "sensor-list",
  shadow: true
})
export class SensorListComponent {


  render(){
    return [
      <sensor-element sensor="ble-heart-rate" action="watch" scope="local"/>,
      <sensor-element sensor="ble-temperature" action="watch" />,
      <sensor-element sensor="ble-blood-pressure" action="watch" />,
      <sensor-element sensor="ble-weight-scale" action="watch" />,

    ];
  }
}
