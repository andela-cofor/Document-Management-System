import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Index from './index.component';
import LoginPage from './LoginPage.component';
import SignupPage from './SignupPage.component';

class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div>
          <Route path="/app/" component={Index} />
          <Route path="/app/login" component={LoginPage} />
          <Route path="/app/signup" component={SignupPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
