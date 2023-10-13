import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';

import "mapbox-gl/dist/mapbox-gl.css";
import "./index.scss";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import {AuthProvider} from 'react-auth-kit';
import {BrowserRouter} from 'react-router-dom';
import {ModalsProvider} from '@mantine/modals'

import {refreshApi} from './helpers/refreshToken';
import {LicenseManager} from "ag-grid-enterprise";

import {IntlProvider} from 'react-intl';
import English from './lang/en.json';
import Spanish from './lang/es.json';

LicenseManager.setLicenseKey(process.env.REACT_APP_AG_GRID_LICENCE);

let locale = navigator.language;

const queryParameters = new URLSearchParams(window.location.search)
if (queryParameters.get('lang'))
    locale = queryParameters.get('lang');

let lang = English;
if (locale.slice(0, 2).toLowerCase() === 'es') {
  locale = 'es';
  lang = Spanish;
}
else {
  locale = 'en';  
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider authType="localstorage" authName="_auth" refresh={refreshApi}>
      <Provider store={store}>
        <BrowserRouter>          
          <MantineProvider
              theme={{
                fontFamily: "'Libre Franklin', sans-serif",
                // Override any other properties from default theme
                spacing: {
                  xs: "1rem",
                  sm: "1.2rem",
                  md: "1.8rem",
                  lg: "2.2rem",
                  xl: "2.8rem"
                }
              }}
            >
            <ModalsProvider>
              <Notifications position="top-right" autoClose={3000}/>
              <IntlProvider locale={locale} messages={lang}>
                <App/>
              </IntlProvider>
            </ModalsProvider>
          </MantineProvider>          
        </BrowserRouter>
      </Provider>
  </AuthProvider>
);
