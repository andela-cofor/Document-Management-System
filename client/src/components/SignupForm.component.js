import swal from 'sweetalert';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { userSignupRequest } from '../actions/signupActions';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
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
    this.props.userSignupRequest(this.state).then(() => {
      this.context.router.history.push('/app/');
    })
    .catch((err) => {
      swal({
        title: 'Error!',
        text: err.response.data.message,
        type: 'error',
        confirmButtonColor: '#9068be',
        confirmButtonText: 'Ok',
        closeOnConfirm: false,
        html: false
      });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="SignupForm">
          <div className="form-control">
            <h1 className="signupHeader">Sign Up</h1>
            <input
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChange}
              type="text"
              name="username"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <input
              placeholder="Firstname"
              value={this.state.firstName}
              onChange={this.onChange}
              type="text"
              name="firstName"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
            <input
              placeholder="Lastname"
              value={this.state.lastName}
              onChange={this.onChange}
              type="text"
              name="lastName"
              className="form-control"
              required
            />
          </div>
          <div className="form-control">
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
          <div className="form-control">
           <button className="SignupBtn">
              Sign up
           </button>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { userSignupRequest })(SignupForm);
