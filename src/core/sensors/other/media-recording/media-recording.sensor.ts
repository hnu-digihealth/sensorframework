import "cap-media-recorder";
import {Plugins} from "@capacitor/core";
import {Sensor} from "../../sensor";
import {SensorConfig} from "../../sensor-config";
import {MediaRecorderOptions} from "cap-media-recorder";

const {MediaRecorder} = Plugins;

export abstract class MediaRecordingSensor extends Sensor{

  private recordings: Map<string, File> = new Map<string, File>();
  private id: string;

  protected constructor(config: SensorConfig){
    super(config);
  }

  protected async onRecord(options: MediaRecorderOptions): Promise<string> {

    const {id} = await MediaRecorder.startRecording(options);
    this.id = id;
    this.recordings.set(this.id, null);

    return this.id;
  }

  protected async onStop(): Promise<void>{
    const file = await MediaRecorder.stopRecording({id: this.id});
    this.recordings.set(this.id, file);
    return ;
  }

  public getRecording(id: string): any {
    const recording = this.recordings.get(id);
    const uri = URL.createObjectURL(recording);
    this.recordings.delete(id);
    return {recording , uri} || null;
  }

}

