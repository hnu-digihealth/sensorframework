export interface HttpOptions {

  uri: string;

  params?: {[name: string]: string | number};

  headers?: {[id: string]: string};

  mode?: RequestMode;

  cache?: RequestCache;

}
