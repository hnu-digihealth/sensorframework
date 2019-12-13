import {Component, h} from "@stencil/core";
import "cap-media-recorder";
import {Plugins} from "@capacitor/core";
const {MediaRecorder} = Plugins;


@Component({
  tag: "sensor-list",
  shadow: true
})
export class SensorListComponent {

  id: string;

  async componentDidLoad(){



  }

  async start(){

    const element = document.getElementById(this.id);
    if(element){
      document.body.removeChild(element);
    }

    const {id} = await MediaRecorder.startRecording({name: "test", video: true, audio: true});
    this.id = id;
    const preview = await MediaRecorder.getPreview({id});
    const video = document.createElement("video");
    video.id = id;
    video.srcObject = preview;
    document.body.appendChild(video);
    await video.play();
  }

  async stop(){

    const element = document.getElementById(this.id);
    if(element){
      document.body.removeChild(element);
    }

    const file = await MediaRecorder.stopRecording({id: this.id});
    const video = document.createElement("video");
    video.src = window.URL.createObjectURL(file);
    video.controls = true;
    video.id = this.id;
    document.body.appendChild(video);

  }

  render(){
    return [
        <ion-button onClick={() => this.start()}>Start</ion-button>,
      <ion-button onClick={() => this.stop()}>Stop</ion-button>,
      <sensor-element sensor="ble-temperature" action="watch" />,
      <sensor-element sensor="ble-blood-pressure" action="watch" />,
      <sensor-element sensor="ble-weight-scale" action="watch" />,

    ];
  }
}
