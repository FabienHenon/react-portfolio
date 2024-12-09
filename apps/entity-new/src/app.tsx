import React from "react";
import ReactDOM from "react-dom";

import { MfMaestroProps, ComponentConfig } from "./types";
import Main from "./components/Main";

// @ts-ignore
import { config } from "../mf-bundler.config";

import "./styles/main.styl";

function start(
  appNode: HTMLElement,
  params: MfMaestroProps["params"],
  options: MfMaestroProps["options"]
): void {
  console.log(
    `%cstarting ${options.groupRef}`,
    "color:violet",
    params,
    options
  );

  ReactDOM.render(
    <Main
      params={params}
      options={options}
      config={makeComponentConfig(params)}
      domain="domain"
    />,
    appNode
  );
}

function stop(appNode: HTMLElement, options: MfMaestroProps["options"]): void {
  console.log(`%cstopping ${options.groupRef}`, "color:orange", options);
}

const makeComponentConfig = (conf: ComponentConfig) => ({
  closable: (conf || {}).closable || false,
  editable: (conf || {}).editable || false,
  deletable: (conf || {}).deletable || false
});

window.MfMaestro.registerMicroApp(config.microAppName, { start, stop });
