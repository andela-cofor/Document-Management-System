import React, { Component } from 'react';

class Navbar extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/app/"><div className="brand-logo">Document Management System</div></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/*<li className={this.props.isHomeActive}>
              <a href="/app/">Home</a>
            </li>*/}
            <li className={this.props.isLoginActive}>
              <a href="/app/login">Login</a>
            </li>
            <li className={this.props.isSignupActive}>
              <a href="/app/signup">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  isHomeActive: 'active',
  isLoginActive: '',
  isSignupActive: ''
};

export default Navbar;
