import { Config } from '@stencil/core';
import {sass} from "@stencil/sass";
import {readFileSync} from 'fs';

export const config: Config = {
  namespace: 'sensors',
  /*devServer: {
    https: {
      key: readFileSync("localhost.key", {encoding: "utf-8"}),
      cert: readFileSync("localhost.cert", {encoding: "utf-8"})
    }
  },*/
  plugins: [
    sass()
  ],
  buildEs5: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ]
};
