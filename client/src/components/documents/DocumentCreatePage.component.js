import { connect } from 'react-redux';
import React, { Component } from 'react';
import DocumentCreateForm from './DocumentCreateForm.component';
import { saveDocument } from '../../actions/documentActions';


/**
 * @class CreateDocumentPage
 * @extends {Component}
 */
class CreateDocumentPage extends Component {
  /**
   * @returns {object} saveDocument
   * @memberof CreateDocumentPage
   */
  render() {
    const saveDocument = this.props.saveDocument;
    return (
      <div>
        <DocumentCreateForm saveDocument={saveDocument} />
      </div>
    );
  }
}

CreateDocumentPage.propTypes = {
  saveDocument: React.PropTypes.func.isRequired
};

export default connect(null, { saveDocument })(CreateDocumentPage);
