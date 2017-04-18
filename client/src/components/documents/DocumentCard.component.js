import React from 'react';
import { Link } from 'react-router-dom';

export default function DocumentCard({ document, deleteDocument }) {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title">{document.title}</span>
            <p>{document.content}</p>
          </div>
          <div className="card-action">
            <Link to={`/document/${document.id}`}>Edit</Link>
            <a href="#" onClick={() => deleteDocument(document.id)}>Delete</a>
          </div>
        </div>
      </div>
    </div>
  );
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
};
