import express from 'express';
import Document from './../app/controllers/documents';
import Auth from '../app/middlewares/Auth';

const docRouter = express.Router();

// Creates and gets all documents.
docRouter.route('/documents')
  .post(Auth.verifyToken,
    Auth.validateDocumentsInput,
    Document.create)
  .get(Auth.verifyToken,
    Auth.validateSearch,
    Document.getAll);

// Find document by Id.
docRouter.route('/documents/:id')
  .get(Auth.verifyToken,
    Auth.getSingleDocument,
    Document.getDocument)
.put(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Document.update)
.delete(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Document.delete);

// Search for a doc.
docRouter.get('/search/documents',
  Auth.verifyToken,
  Auth.getDocByTitle,
  Document.getDocByTitle);


export default docRouter;
