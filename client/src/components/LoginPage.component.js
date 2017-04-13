import { connect } from 'react-redux';
import React, { Component } from 'react';
import LoginForm from './LoginForm.component';
import { userLoginRequest } from '../actions/loginAction';

class LoginPage extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    const { userLoginRequest } = this.props;
    return (
      <LoginForm userLoginRequest={userLoginRequest} />
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userLoginRequest })(LoginPage);
