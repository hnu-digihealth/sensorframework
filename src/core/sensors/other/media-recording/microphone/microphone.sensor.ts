import {MediaRecordingSensor} from "../media-recording.sensor";

class MicrophoneSensor extends MediaRecordingSensor{

  constructor(){
    super({
      name: "microphone",
      actions: {
        record: true
      }
    })
  }

}

const Microphone = new MicrophoneSensor();
export {Microphone};
