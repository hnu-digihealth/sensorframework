import {Sensor} from "../../sensor";
import {HttpOptions} from "./http.options";

class HttpSensor extends Sensor{

  constructor(){
    super({
      name: "http",
      actions: {
        pull: true,
        push: true
      }
    });
  }

  async onPull(options: HttpOptions){

    let {uri, params, headers, mode , cache} = options;

    if(params){
      uri += "?";

      for( const key in Object.keys(params)){
        if(params.hasOwnProperty(key)){
          uri += `${key}=${params[key]}&`;
        }
      }

      if(uri.endsWith("&")){
        uri = uri.substring(0, uri.length - 1);
      }
    }

    const response = await fetch(uri, {
      headers: new Headers(headers),
      mode,
      cache
    });

    const status = response.status;

    if(!(response.ok || status == 200)){
      return { uri, status, data: null};
    }

    if(response.headers.has("Content-Type")){

      let contentType = response.headers.get("Content-Type");

      contentType = contentType.split(";")[0];

      switch (contentType) {
        case "application/json": {
          const data = await response.json();
          return {uri, status, data};
        }
        case "text/css":
        case "text/csv":
        case "text/html":
        case "text/plain":
        case "text/xml": {
          const data = await response.text();
          return {uri, status, data};
        }
        default: {
          throw new Error(`Not able to handle ${contentType}`);
        }
      }

    }
  }

  async onPush(options?:any, data?:any){
    console.log(options, data);
  }

}

const Http = new HttpSensor();
export {Http};
