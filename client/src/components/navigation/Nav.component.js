import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Navbar extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.context.router.history.push('/app/login');
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/app/home"><div className="brand-logo">Document Management System</div></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.props.isHomeActive}>
              {isAuthenticated
                ? <a href="/app/document">Document</a>
                : <a href="/app/home" />
              }
            </li>
            <li className={this.props.isLoginActive}>
              {isAuthenticated
                ? <a href="/app/profile" >Profile</a>
                : <a href="/app/login">Login</a>
              }
            </li>
            <li className={this.props.isSignupActive}>
              {isAuthenticated
                ? <a href="/app/logout" onClick={this.logout.bind(this)} >Logout</a>
                : <a href="/app/signup">Signup</a>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  isHomeActive: React.PropTypes.string.isRequired,
  isLoginActive: React.PropTypes.string.isRequired,
  isSignupActive: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired
};

Navbar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
