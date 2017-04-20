import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import DocumentsList from './DocumentList.component';
import { fetchDocuments, deleteDocument, updateDocument } from '../../actions/documentActions';
import Search from '../common/Search';

class DocumentsPage extends React.Component {
  componentDidMount() {
    this.props.fetchDocuments();
  }

  handleSearch() {
    
  }

  render() {
    return (
      <div>
        <h1></h1>
        <div className="row">
          <div className="col s7 push-s8">
            <Search onChange={this.handleSearch.bind(this)} />
          </div>
          <div className="col s5 pull-s7">
            <Link className="btn create-list-link hero-btn qBox add" to="/app/create">
              +
            </Link>
          </div>
        </div>
        <DocumentsList
          documents={this.props.documents}
          deleteDocument={this.props.deleteDocument}
          updateDocument={this.props.updateDocument}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
  };
}

export default connect(mapStateToProps, { fetchDocuments, deleteDocument, updateDocument })(DocumentsPage);
