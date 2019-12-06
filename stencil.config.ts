import { Config } from '@stencil/core';
import {sass} from "@stencil/sass";
import {readFileSync} from 'fs';

export const config: Config = {
  namespace: 'sensors',
  devServer: {
    address: "0.0.0.0",
    https: {
      key: readFileSync("localhost.key", {encoding: "utf-8"}),
      cert: readFileSync("localhost.cert", {encoding: "utf-8"})
    }
  },
  plugins: [
    sass()
  ],
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
