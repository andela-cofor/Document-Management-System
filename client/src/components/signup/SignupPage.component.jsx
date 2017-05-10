import { connect } from 'react-redux';
import React, { Component } from 'react';
import SignupForm from './SignupForm.component';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';


/**
 * @class SignupPage
 * @extends {Component}
 */
class SignupPage extends Component {
  /**
   * @returns {html} SignupForm
   * @memberof SignupPage
   */
  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);
