import React, { Component } from 'react';
import {Modal, Button, Row, Input, Pagination} from 'react-materialize';
import { Link } from 'react-router-dom';

class AllDocumentsCard extends Component {
  constructor (props) {
    super(props);
    const { fetchDocuments } = this.props;
    this.state = {
      id: '',
      title: '',
      content: '',
      access: '',
      ownerId: '',
      ownerRoleId: ''
    };
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const title = event.target.title.value;
    const access = event.target.access.value;
    const content = event.target.content.value;
    const documentDetails = { id, title, access, content };
    this.props.updateDocument(documentDetails)
    .then((res) => {
      this.context.router.history.push('/app/document/all');
      Materialize.toast(res.document.message, 4000, 'rounded');
    });
  }

  render() {
    return (
      <div className="col s4">
        <div className="card small qBox">
          <div className="card-image">
            <img className="activator" src="http://materializecss.com/images/sample-1.jpg" />
          </div>
          <div className="card-content white-text">
            <span className="card-title">{this.props.document.title}</span>
          </div>
          <div className="card-reveal">
            <span className="card-title"><strong>Title: </strong>{this.props.document.title}
              <i className="material-icons right">close</i>
            </span>
            <div>
              <span><strong>Created:</strong> { (this.props.document.createdAt)
                ? this.props.document.createdAt.split('T')[0] : ''}</span>
              <span className=""><p><strong>Updated:</strong> { (this.props.document.updatedAt)
                ? this.props.document.createdAt.split('T')[0] : ''}</p></span>
              <span><p><strong>Document ID:</strong> {this.props.document.id}</p></span>
              
              <span><strong>Role:</strong> {this.props.document.access}</span>
            </div>
            <p><span><strong>Content:</strong> {this.props.document.content}</span></p>
          </div>
          <div className="card-action">  
          </div>
        </div>
      </div>
    );
  }
}

AllDocumentsCard.propTypes = {
  document: React.PropTypes.object.isRequired,
};

AllDocumentsCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AllDocumentsCard;
