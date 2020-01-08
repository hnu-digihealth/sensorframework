import { MediaRecordingSensor } from "../media-recording.sensor";
class MicrophoneSensor extends MediaRecordingSensor {
    constructor() {
        super({
            name: "microphone",
            actions: {
                stream: true
            }
        });
    }
}
const Microphone = new MicrophoneSensor();
export { Microphone };
