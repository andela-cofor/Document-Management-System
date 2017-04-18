import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import DocumentsList from './DocumentList.component';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';
import Search from '../common/Search';

class DocumentsPage extends React.Component {
  componentDidMount() {
    console.log('Working')
    this.props.fetchDocuments();
    console.log(this.props.documents);
  }

  handleSearch() {

  }

  render() {
    console.log(this.props.documents);
    return (
      <div>
        <h1>Documents List</h1>
        <div className="row">
          <div className="col s7 push-s4">
            <Search onChange={this.handleSearch.bind(this)} />
          </div>
          <div className="col s5 pull-s7">
            <Link className="btn create-list-link hero-btn" to="document">
              Add Document
            </Link>
          </div>
        </div>
        <DocumentsList
          documents={this.props.documents}
          deleteDocument={this.props.deleteDocument}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
  };
}

export default connect(mapStateToProps, { fetchDocuments, deleteDocument })(DocumentsPage);
