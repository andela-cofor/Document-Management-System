import { connect } from 'react-redux';
import React, { Component } from 'react';
import { userLoginRequest } from '../../actions/authActions';


/**
 * @class LoginForm
 * @extends {Component}
 */
class LoginForm extends Component {
  /**
   * Creates an instance of LoginForm.
   * @param {any} props
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} event
   * @memberof LoginForm
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event
   * @memberof LoginForm
   * @returns {object} response from server
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userLoginRequest(this.state).then((res) => {
      this.context.router.history.push('/app/document');
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 4000, 'rounded');
    });
  }

  /**
   * @returns {html} form
   * @memberof LoginForm
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="loginForm">
          <div className="form-control">
            <h1 className="loginHeader">Login</h1>
            <label className="active" htmlFor="first_name">Email:</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <label className="active" htmlFor="first_name">Password</label>
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <button className="loginButton">
              Login
           </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { userLoginRequest })(LoginForm);
