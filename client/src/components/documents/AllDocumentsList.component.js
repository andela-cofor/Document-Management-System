import React from 'react';
import AllDocumentsCard from './AllDocumentsCard.component';

export default function AllDocumentsList({ documents }) {
  const emptyMessage = (
    <p className="qBox1"><strong>There are no documents yet in your collection.</strong></p>
  );

  const alldocumentsList = (
    <div className="row">
      {documents.map(document =>
        <AllDocumentsCard
          document={document}
          key={document.id}
        />)}
    </div>
  );

  return (
    <div>
      {alldocumentsList}
    </div>
  );
}

AllDocumentsList.propTypes = {
  documents: React.PropTypes.array.isRequired,
};
