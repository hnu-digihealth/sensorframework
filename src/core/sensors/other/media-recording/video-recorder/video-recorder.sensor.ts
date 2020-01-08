import {MediaRecordingSensor} from "../media-recording.sensor";

class VideoRecorderSensor extends MediaRecordingSensor{

  constructor(){
    super({
      name: "video",
      actions: {
        record: true
      }
    })
  }

}

const VideoRecorder = new VideoRecorderSensor();
export {VideoRecorder};
