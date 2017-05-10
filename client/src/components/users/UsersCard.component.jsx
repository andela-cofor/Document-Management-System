import React, { Component } from 'react';
import {Modal, Button, Row, Input, Pagination} from 'react-materialize';
import { Link } from 'react-router-dom';

class UsersCard extends Component {
    constructor (props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      access: '',
      ownerId: '',
      ownerRoleId: ''
    };
  }
  render() {
    return (
      <div className="col s3">
        <div className="card qBox">
          <Modal
            className="modal"
            trigger={
              <i className="eye material-icons right">remove_red_eye</i>
              }
          >
           <div className="card-reveal">
             <span className="card-title activator"><h1><strong>{this.props.users.firstName}</strong>
               &nbsp;<strong>{this.props.users.lastName}</strong></h1></span>
             <p><span className="card-title"><strong>Username: </strong>{this.props.users.username}
             </span></p>
             <div>
               <span><strong>Created:</strong> { (this.props.users.createdAt)
                  ? this.props.users.createdAt.split('T')[0] : ''}</span>
               <span className=""><p><strong>Updated:</strong> { (this.props.users.updatedAt)
                  ? this.props.users.createdAt.split('T')[0] : ''}</p></span>
             </div>
             <p><span><strong>Email:</strong> {this.props.users.email}</span></p>
           </div>
          </Modal>
          <div className="card-content white-text">
            <span className="card-title activator">{this.props.users.firstName} {this.props.users.lastName}</span>
          </div>
          <a href="#" onClick={() => this.props.deleteUser(this.props.users.id)}>
            <i id="delete" className="material-icons icon-color">delete</i>
          </a>
        </div>
      </div>
    );
  }
}

UsersCard.propTypes = {
  users: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
};

UsersCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UsersCard;
