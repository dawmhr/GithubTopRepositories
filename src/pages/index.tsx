import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Example from './Example';

class Page extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Example} />
      </Switch>
    );
  }
}

export default Page;
