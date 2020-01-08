import "cap-media-recorder";
import { Plugins } from "@capacitor/core";
import { Sensor } from "../../sensor";
const { MediaRecorder } = Plugins;
export class MediaRecordingSensor extends Sensor {
    constructor(config) {
        super(config);
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }
    async onStream(options) {
        const { id } = await MediaRecorder.startRecording(options);
        this.id = id;
        return this.promise;
    }
    async onStop() {
        const file = await MediaRecorder.stopRecording({ id: this.id });
        this.resolve(file);
        return;
    }
}
