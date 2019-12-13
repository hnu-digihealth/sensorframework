import "cap-media-recorder";
import {Plugins} from "@capacitor/core";
import {Sensor} from "../../sensor";
import {SensorConfig} from "../../sensor-config";
import {MediaRecorderOptions} from "cap-media-recorder";

const {MediaRecorder} = Plugins;

export abstract class MediaRecordingSensor extends Sensor {

  private id: string;
  private resolve: (file: File) => void;

  private promise: Promise<File> = new Promise<File>((resolve) => {
    this.resolve = resolve;
  });

  protected constructor(config: SensorConfig){
    super(config);
  }

  protected async onStream(options: MediaRecorderOptions): Promise<File> {
    const {id} = await MediaRecorder.startRecording(options);
    this.id = id;

    return this.promise;
  }

  protected async onStop(): Promise<void>{
    const file = await MediaRecorder.stopRecording({id: this.id});
    this.resolve(file);
    return ;
  }

}

