import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProfilePageForm from './ProfilePageForm.components';
import getUser from '../../actions/profileAction';
import { updateUser } from '../../actions/profileAction';

class ProfilePage extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Login
   */
  render() {
    return (
      <ProfilePageForm user={this.props.user} getUser={this.props.getUser} updateUser={this.props.updateUser} />
    );
  }
}

ProfilePage.propTypes = {
  user: React.PropTypes.number.isRequired,
  getUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { getUser, updateUser })(ProfilePage);
