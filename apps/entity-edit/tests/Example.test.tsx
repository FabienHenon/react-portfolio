import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement } from '@testing-library/react';
import i18n from "../src/components/i18n";
import { I18nextProvider } from "react-i18next";
import Main from "../src/components/Main";

const options = {
  events: {
    emit: (event: string, args: any): object => {
      console.log('event emited ', event);
      return {};
    },
    on: (event: string, cb: () => void, context?: string | object): object => {
      console.log('event received', event);
      return {};
    }
  },
  groupRef: 'ref'
};

const params = {
  path: '',
  closable: false,
  editable: false,
  deletable: false,
  id: 'my-id'
};

const config = {
  closable: false,
  editable: false,
  deletable: false
};

const domain = 'domain';

describe('Component', () => {
  it('should render the form', async () => {
    const component = render(<I18nextProvider i18n={i18n}><Main options={options} params={params} config={config} domain={domain} /> </I18nextProvider>);
    console.log(component);
    const element = await waitForElement(() => component.container.querySelector('[data-test-id="entity-input-firstname"]'));
    expect(element).not.toBe(null);
  });
});
