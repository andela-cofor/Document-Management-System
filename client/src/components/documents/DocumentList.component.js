import React from 'react';
import DocumentCard from './DocumentCard.component';

export default function DocumentsList({ documents, deleteDocument, updateDocument }) {
  const emptyMessage = (
    <p className="qBox1"><strong>There are no documents yet in your collection.</strong></p>
  );

  const documentsList = (
    <div className="row">
      {documents.map(document =>
        <DocumentCard
          document={document}
          key={document.id}
          deleteDocument={deleteDocument}
          updateDocument={updateDocument}
        />)}
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
  updateDocument: React.PropTypes.func.isRequired,
};
