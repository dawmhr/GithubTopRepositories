import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import history from './utils/History';
import mobxStore from './stores';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Kanit",  sans-serif',
    fontSize: 15,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={THEME}>
    <Provider {...mobxStore}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
