import React, { Component } from 'react';
import { Button, Row, Input, Pagination} from 'react-materialize';
import { Link } from 'react-router-dom';

class ProfilePageForm extends Component {
  componentDidMount() {
    this.props.getUser(this.props.user).then((res) => {
      this.setState({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        username: res.data.user.username,
        email: res.data.user.email,
        password: res.data.user.password
      });
    });
  }
  /**
   * renders the ProfilePageForm component
   * @returns {void}
   * @memberOf ProfilePage
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state, this.props.user)
  }

  render() {
    return (
      <div className="pro-form">
        <form className="col s12" method="post" onSubmit={(e) => this.onSubmit(e)}>
          <div className="row">
            <div className="input-field col s6">
              <Input
                s={6}
                name="firstName"
                value={this.state.firstName}
                onChange={(event) => this.onChange(event)}
                required
              />
              <label className="active" htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <Input
                s={6}
                name="lastName"
                value={this.state.lastName}
                onChange={(event) => this.onChange(event)}
                required
              />
              <label className="active" htmlFor="last_name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <Input
                s={6}
                name="username"
                value={this.state.username}
                onChange={(event) => this.onChange(event)}
                required
              />
              <label className="active" htmlFor="user_name">Username</label>
            </div>
            <div className="input-field col s6">
              <Input
                s={6}
                name="email"
                value={this.state.email}
                onChange={(event) => this.onChange(event)}
                required
              />
              <label className="active" htmlFor="email">Email</label>
            </div>
            <div className="input-field col s6">
              <Input
                s={6}
                name="password"
                type="password"
                value={this.state.password}
                onChange={(event) => this.onChange(event)}
                required
              />
              <label className="active" htmlFor="password">Password</label>
            </div>
            <div className="row">
              <div className="col s6">
                <button className="btn-update" waves="light" type="submit">UPDATE</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ProfilePageForm.propTypes = {
  user: React.PropTypes.number.isRequired,
  getUser: React.PropTypes.func.isRequired
};

ProfilePageForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProfilePageForm;
