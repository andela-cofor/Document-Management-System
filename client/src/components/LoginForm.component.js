import swal from 'sweetalert';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { userLoginRequest } from '../actions/loginAction';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userLoginRequest(this.state).then((res) => {
      this.context.router.history.push('/app/');
    })
    .catch((err) => {
      swal({
        title: 'Error!',
        text: err.response.data.message,
        type: 'error',
        confirmButtonColor: '#18aa8d',
        confirmButtonText: 'Ok',
        closeOnConfirm: false,
        html: false
      });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="loginForm">
          <div className="form-control">
            <h1 className="loginHeader">Login</h1>
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <input
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <button className="loginButton">
              Submit
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
