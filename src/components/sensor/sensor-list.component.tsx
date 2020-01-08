import {Component, h} from "@stencil/core";



@Component({
  tag: "sensor-list",
  shadow: true
})
export class SensorListComponent {

  log(data: any){
    console.log(data);
  }


  render(){
    return [
      <sensor-element sensor="video" action="record" options={{video: true}} onSampleData={(event) => this.log(event.detail)} />,
    ];
  }
}
