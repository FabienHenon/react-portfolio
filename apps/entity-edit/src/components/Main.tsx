import React from "react";
import { I18nextProvider } from "react-i18next";
import Component from "./component/Edit";

import { MfMaestroProps as AppProps } from "../types";
import i18n from "./i18n";


const Main: React.FC<AppProps> = ({ params, options, config, domain }: AppProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Component params={params} options={options} config={config} domain={domain} />
    </I18nextProvider>
  );
};

export default Main;
