import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import AllDocumentsList from './AllDocumentsList.component';
import { fetchDocuments, deleteDocument, updateDocument, fetchDocument } from '../../actions/documentActions';
import Search from '../common/Search';
import { searchDocuments } from '../../actions/searchAction';

class AllDocumentsPage extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocuments();
  }

  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query === '') {
      window.location = '/app/document/all';
    } else {
      this.props.searchDocuments(query);
    }
  }

  render() {
    const emptyMessage = (
      <p className="qBox1"><strong>There are no documents yet in your collection.</strong></p>
    );

    const documentSearchResult = this.props.search;
    const renderedDocuments = documentSearchResult.length > 0
      ? documentSearchResult : this.props.documents;

    return (
      <div>
        <h1></h1>
        <div className="row">
          <div className="col s7 push-s8">
            {this.props.documents.length > 0
            ? <Search onChange={this.handleSearch.bind(this)} />
            : emptyMessage}
            {/*<UserTour />*/}
          </div>
          <div className="col s5 pull-s7">
          </div>
        </div>
        <AllDocumentsList
          documents={renderedDocuments}
        />
      </div>
    );
  }
}

AllDocumentsPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  // fetchDocument: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchDocuments: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  // console.log(state.auth.user.userId)
  console.log(state.documents)
  return {
    documents: state.documents,
    search: state.search,
  };
}

export default connect(mapStateToProps, { fetchDocuments, searchDocuments })(AllDocumentsPage);
