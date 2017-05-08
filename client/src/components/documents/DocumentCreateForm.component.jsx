import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

// Require Editor JS files.
require('froala-editor/js/froala_editor.pkgd.min.js');

// Require Editor CSS files.
require('froala-editor/css/froala_style.min.css');
require('froala-editor/css/froala_editor.pkgd.min.css');

// Require Font Awesome.
// require('font-awesome/css/font-awesome.css');

let FroalaEditor = require('react-froala-wysiwyg');

/**
 * @class DocumentCreateForm
 * @extends {Component}
 */
class DocumentCreateForm extends Component {
  /**
   * renders the CreateDocument component
   * @param {props} props
   * @returns {void}
   * @memberOf CreateDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'public',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  /**
   * @param {any} event
   * @memberof DocumentCreateForm
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * @param {any} event
   * @memberof DocumentCreateForm
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.saveDocument(this.state).then(() => {
      this.context.router.history.push('/app/document');
    });
  }

  /**
   * @param {object} content
   * @memberof DocumentCreateForm
   * @returns {void}
   */
  handleModelChange(content) {
    this.setState({ content });
  }


  /**
   * @returns {html} form
   * @memberof DocumentCreateForm
   */
  render() {
    return (
      <div className="doc-form">
        <form onSubmit={this.onSubmit}>
          <div className="form-control">
            <h5>Create a Document</h5>
            <Row className="form-control">
              <Input
                placeholder="Title"
                s={12}
                validate
                name="title"
                required
                value={this.state.title}
                onChange={this.onChange}
                className="form-control"
              />
              {/*<Input
                placeholder="Content"
                s={12}
                validate
                type="textarea"
                name="content"
                required
                value={this.state.content}
                onChange={this.onChange}
              />*/}
              <Input
                validate
                type="select"
                name="access"
                value={this.state.access}
                onChange={this.onChange}
                id="access"
              >
                <option className="optionBtn" name="Public" value="public">Public</option>
                <option className="optionBtn" name="Private"value="private">Private</option>
                <option className="optionBtn" name="Role" value="role">Role</option>
              </Input>
            </Row>
            <FroalaEditor
              validate
              tag="textarea"
              config={this.config}
              model={this.state.model}
              onModelChange={this.handleModelChange}
            />
            <button className="btn waves-effect waves-light right">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

DocumentCreateForm.propTypes = {
  saveDocument: React.PropTypes.func.isRequired
};

DocumentCreateForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DocumentCreateForm;
