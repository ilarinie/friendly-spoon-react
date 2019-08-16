import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core';
import { red, teal } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { makeStore } from './state/Store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

export const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#ff4081',
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    type: 'light',
  },
});

const state = makeStore();

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={state}>
        <Route component={App} />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
