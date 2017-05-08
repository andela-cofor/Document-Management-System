import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import DocumentsList from './DocumentList.component';
import { fetchDocuments, deleteDocument, updateDocument, fetchDocument } from '../../actions/documentActions';
import Search from '../common/Search';
import { searchDocuments } from '../../actions/searchAction';


/**
 * @class DocumentsPage
 * @extends {React.Component}
 */
class DocumentsPage extends React.Component {

  /**
   * Creates an instance of DocumentsPage.
   * @memberof DocumentsPage
   */
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }


  /**
   * @memberof DocumentsPage
   * @returns {void}
   */
  componentDidMount() {
    this.props.fetchDocument(this.props.uI);
  }


  /**
   * @param {any} event
   * @memberof DocumentsPage
   * @returns {void}
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    if (query === '') {
      window.location = '/app/document';
    } else {
      this.props.searchDocuments(query);
    }
  }


  /**
   * @returns {object} cards
   * @memberof DocumentsPage
   */
  render() {
    const documentSearchResult = this.props.search;
    const renderedDocuments = documentSearchResult.length > 0
      ? documentSearchResult : this.props.documents;
      const emptyDiv = (<div></div>)

    return (
      <div>
        <h1></h1>
        <div className="row">
          <div className="col s7 push-s8">
            {this.props.documents.length > 0 
            ? <Search onChange={this.handleSearch.bind(this)} /> 
            : emptyDiv}
          </div>
          <div className="col s5 pull-s7" id="createdocument add">
            <Link id="hero-btn" className="add btn create-list-link hero-btn qBox hero-btn" to="/app/create">
              +
            </Link>
          </div>
        </div>
        <DocumentsList
          documents={renderedDocuments}
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
  fetchDocument: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  search: React.PropTypes.array.isRequired,
  searchDocuments: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
    search: state.search,
    uI: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { fetchDocuments, deleteDocument, updateDocument, searchDocuments, fetchDocument })(DocumentsPage);
