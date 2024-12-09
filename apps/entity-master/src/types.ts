interface MaestroAPI {
  start: (
    appNode: HTMLElement,
    params: MfMaestroProps["params"],
    options: MfMaestroProps["options"]
  ) => void;
  stop: (appNode: HTMLElement, options: MfMaestroProps["options"]) => void;
}

declare global {
  interface Window {
    MfMaestro: {
      registerMicroApp: (name: string, api: MaestroAPI) => void;
    };
  }
}

export interface MfMaestroProps {
  params: Params;
  options: {
    events: Events;
    groupRef: string;
  };
  domain: string;
  config: ComponentConfig;
}

export interface Events {
  on: EventsOn;
  emit: EventsEmit;
}

export type EventsOn = (
  event: string,
  callback: () => void,
  context?: string | object
) => object;

export type EventsEmit = (
  event: string,
  ...args: Array<string | object>
) => object;

export interface Params {
  path: string;
  closable: boolean;
  editable: boolean;
  deletable: boolean;
}

export interface ComponentConfig {
  closable: boolean;
  editable: boolean;
  deletable: boolean;
}