import {Component, h, Method, Element, State} from "@stencil/core";
import "@ionic/core";
import {SensorHostElement} from "../../core/sensor-host-element";

export interface SensorUIConfig {

  component: string;

  properties ?: {[key: string]: any};

  success?: (...args:any[]) => void;

  error?: (...args:any[]) => void;

  host?: SensorHostElement;

}

@Component({
  tag: "sensor-configuration",
  styleUrl: "sensor-configuration.styles.scss",
  shadow: true
})
export class SensorConfigurationComponent {

  @Element() element: HTMLElement;

  @State() private configQueue: SensorUIConfig[] = [];

  @State() private currentIndex: number = 0;

  private slides: HTMLIonSlidesElement;

  @Method()
  async addConfig(toAdd: SensorUIConfig){
    this.configQueue = [...this.configQueue, toAdd];
  }

  async componentDidLoad(){

  }

  async componentDidUnload(){
    for(let i = this.currentIndex; i < this.configQueue.length; i++){
      this.configQueue[i].error(new Error("User configuration was canceled"));
    }
  }

  private dismiss(){
    const parent = this.element.parentElement;
    parent.removeChild(this.element);
  }

  private async next(){

    const isEnd = await this.slides.isEnd();

    if(isEnd){
      this.dismiss();
      return ;
    }

    await this.slides.lockSwipes(false);
    await this.slides.slideNext();
    await this.slides.lockSwipes(true);
    this.currentIndex = await this.slides.getActiveIndex();
  }

  private async onConfigSuccess(item: SensorUIConfig, data?: any){
    item.success(data);
    await this.next();
  }

  private onConfigError(item: SensorUIConfig, error: Error){
    item.error(error);
  }

  private async skip(){
    const current = this.configQueue[this.currentIndex];
    current.error(new Error('User skipped sensor configuration'));
    await this.next();
  }

  render() {

    if(!this.configQueue.length){
      return "...";
    }

    return [
        <div class="overlay-background" />,
        <div class="config-wrapper">
          <h3 class="title">Configuration</h3>
            <ion-slides ref={(element) => this.slides = element} pager={true}
                        options={{allowSlidePrev: false, allowSlideNext: false}}>
              {
                this.configQueue.map((item) => {

                  const DynamicConfigComponent = item.component;

                  return (
                    <ion-slide>
                      <DynamicConfigComponent {...item.properties} class="config-item"
                                              onSuccess={(data?) => this.onConfigSuccess(item, data)}
                                              onError={(error) => this.onConfigError(item, error)}
                      />
                    </ion-slide>
                  )
                })
              }
            </ion-slides>


            <ion-button fill="clear" class="btn-cancel" onClick={() => this.dismiss()}>Cancel</ion-button>
            <ion-button fill="clear" class="btn-skip" onClick={() => this.skip()}>Skip</ion-button>
        </div>

    ]

  }

}
