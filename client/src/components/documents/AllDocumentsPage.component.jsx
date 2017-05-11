import { connect } from 'react-redux';
import React from 'react';
import { Pagination } from 'react-materialize';
import { Link } from 'react-router-dom';
import AllDocumentsList from './AllDocumentsList.component';
import { fetchDocuments, deleteDocument, updateDocument, fetchDocument } from '../../actions/documentActions';
import Search from '../common/Search';
import { searchDocuments } from '../../actions/searchAction';
import paginateDocumentAction from '../../actions/paginateDocumentAction';


/**
 * @class AllDocumentsPage
 * @extends {React.Component}
 */
class AllDocumentsPage extends React.Component {

  /**
   * Creates an instance of AllDocumentsPage.
   * @memberof AllDocumentsPage
   */
  constructor() {
    super();
    this.state = {
      query: '',
      limit: 8,
      offset: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }


  /**
   * @function componentDidMount
   * @memberof AllDocumentsPage
   * @returns {void}
   */
  componentDidMount() {
    this.props.fetchDocuments();
    this.props.paginateDocumentAction(this.state.offset, this.state.limit);
  }


  /**
   * @param {any} event
   * @memberof AllDocumentsPage
   * @returns {void}
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query === '') {
      window.location = '/app/document/all';
    } else {
      this.props.searchDocuments(query);
    }
  }

  /**
   * @returns {object} of cards
   * @memberof AllDocumentsPage
   */
  render() {
    const emptyMessage = (
      <p className="qBox1"><strong>There are no documents yet in your collection.</strong></p>
    );

    const documentSearchResult = this.props.search;
    const renderedDocuments = documentSearchResult.length > 0
      ? documentSearchResult : this.props.documents;

    return (
      <div>
        <div className="row">
          <div className="col s7 push-s8">
            {this.props.documents.length > 0
            ? <Search onChange={this.handleSearch.bind(this)} />
            : emptyMessage}
          </div>
          <div className="col s5 pull-s7">
          </div>
        </div>
        <AllDocumentsList
          documents={renderedDocuments}
        />
        <Pagination
          className="pag"
          items={this.props.pageCount}
          onSelect={(page) => {
            const offset = (page - 1) * 9;
            this.props.paginateDocumentAction(offset, this.state.limit);
          }}
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
  searchDocuments: React.PropTypes.func.isRequired,
  paginateDocumentAction: React.PropTypes.func.isRequired,
};

/**
 * @function
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    documents: state.pagination.items,
    pageCount: state.pagination.pageCount,
    search: state.search,
  };
}

export default connect(mapStateToProps, { fetchDocuments, searchDocuments, paginateDocumentAction })(AllDocumentsPage);
