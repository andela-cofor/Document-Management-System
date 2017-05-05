import React, { Component } from 'react';
import {Modal, Button, Row, Input, Pagination} from 'react-materialize';
import { Link } from 'react-router-dom';


/**
 * @class DocumentCard
 * @extends {Component}
 */
class DocumentCard extends Component {

  /**
   * Creates an instance of DocumentCard.
   * @param {any} props
   * @memberof DocumentCard
   */
  constructor(props) {
    super(props);
    const { updateDocument } = this.props;
    const { deleteDocument } = this.props;
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


  /**
   * @param {any} event
   * @memberof DocumentCard
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * @param {any} event
   * @memberof DocumentCard
   * @returns {object} response from server
   */
  onSubmit(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const title = event.target.title.value;
    const access = event.target.access.value;
    const content = event.target.content.value;
    const documentDetails = { id, title, access, content };
    this.props.updateDocument(documentDetails)
    .then((res) => {
      this.context.router.history.push('/app/document');
      Materialize.toast(res.document.message, 4000, 'rounded');
    });
  }


  /**
   * @returns
   * @memberof DocumentCard
   * @returns {void} void
   */
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
            <Modal
              header='Edit Document'
              trigger={
                <i className="material-icons icon-color edit">mode_edit</i>
                }
            >
              <form className="col s12" method="post" onSubmit={(e) => this.onSubmit(e)}>
                <Row>
                  <Input
                    s={6}
                    value="DOCUMENT ID"
                  />
                  <Input
                    s={6} name="id"
                    value={this.props.document.id}
                  />
                </Row>
                <Row>
                  <Input
                    s={6}
                    name="title"
                    value={this.state.title === ''
                    ? this.props.document.title
                    : this.state.title} onChange={(event) => this.onChange(event)}
                    id="title"
                  />
                  <select
                    s={6}
                    type="select"
                    name="access"
                    onChange={(event) => this.onChange(event)}
                    value={this.state.access === '' ? this.props.document.access : this.state.access}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="role">Role</option>
                  </select>
                </Row>
                <Row>
                  <textarea
                    id="content"
                    name="content"
                    value={this.state.content === ''
                    ? this.props.document.content
                    : this.state.content}
                    onChange={e => this.onChange(e)}
                    label="Content"
                    className="content materialize-textarea"
                  />
                </Row>
                <Button className="" waves="light" type="submit">UPDATE</Button>
              </form>
            </Modal>
            <a href="#" onClick={() => this.props.deleteDocument(this.props.document.id)}>
              <i className="material-icons icon-color delete">delete</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired
};

DocumentCard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DocumentCard;
