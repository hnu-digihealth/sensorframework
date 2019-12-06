import {Component,h, Prop} from "@stencil/core";
import "@ionic/core";

@Component({
  tag: "connection-spinner",
  styleUrl: "ble-connection-spinner.styles.scss",
  shadow: true
})
export class BleConnectionSpinnerComponent {

  @Prop() direction: "top" | "bottom" | "left" | "right" = "right";

  @Prop() label: string;


  render(){
    return (
      <host class={`spinner-direction-${this.direction}`}>
        <div class="outer">
          <div class="middle">
            <div class="inner"></div>
          </div>
        </div>
        <ion-icon name="bluetooth"></ion-icon>
      </host>
    )
  }

}
