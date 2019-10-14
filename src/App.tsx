import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import ExamplePage from './pages/Example';
import './common/styles/global.scss';

interface IAppProps {
  location: any;
}

interface IAppState {
  prevLocation: any;
}

class App extends Component<IAppProps, IAppState> {
  state = {
    prevLocation: [],
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ExamplePage} />
      </Switch>
    );
  }
}

export default withRouter(App as any);
