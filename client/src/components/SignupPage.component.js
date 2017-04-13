import { connect } from 'react-redux';
import React, { Component } from 'react';
import SignupForm from './SignupForm.component';
import { userSignupRequest } from '../actions/signupActions';

class SignupPage extends Component {
  render() {
    const userSignupRequest = this.props.userSignupRequest;
    return (
      <SignupForm userSignupRequest={userSignupRequest} />
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);
