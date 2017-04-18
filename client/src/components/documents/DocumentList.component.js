import React from 'react';
import DocumentCard from './DocumentCard.component';

export default function DocumentsList({ documents, deleteDocument }) {
  const emptyMessage = (
    <p>There are no documents yet in your collection.</p>
  );

  const documentsList = (
    <div>
      {documents.map(document => <DocumentCard document={document} key={document.id} deleteDocument={deleteDocument} />)}
    </div>
  );

  return (
    <div>
      {documents.length === 0 ? emptyMessage : documentsList}
    </div>
  );
}

DocumentsList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
};
