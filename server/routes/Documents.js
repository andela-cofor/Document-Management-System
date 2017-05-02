import express from 'express';
import Document from './../app/controllers/Documents';
import Auth from '../app/middlewares/Auth';

const docRouter = express.Router();


/**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - access
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
docRouter.route('/documents')

/**
   * @swagger
   * /documents:
   *   get:
   *     description: Returns documents
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *      - name: x-access-token
   *        in: header
   *        description: an authorization header
   *        required: true
   *        type: string
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Document'
   */

/**
   * @swagger
   * /documents:
   *   post:
   *     description: Creates new document
   *     tags:
   *      - Create
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: document
   *         description: Document object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewDocument'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Document'
   */
  .post(Auth.verifyToken,
    Auth.validateDocumentsInput,
    Document.create)
  .get(Auth.verifyToken,
    Auth.validateSearch,
    Document.getAll);

/**
 * @swagger
 * definitions:
 *   NewDocUpdate:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - access
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *   DocUpdate:
 *     allOf:
 *       - $ref: '#/definitions/NewDocUpdate'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
docRouter.route('/documents/:id')
/**
   * @swagger
   * /documents/{id}:
   *   get:
   *     description: Returns a particular document
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The document's id
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/DocUpdate'
   */
  /**
   * @swagger
   * /documents/{id}:
   *   put:
   *     description: Updates the document of the user signed in
   *     tags:
   *      - Update
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: id
   *          description: The document's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: document
   *          description: User object
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *            $ref: '#/definitions/NewDocUpdate'
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           $ref: '#/definitions/DocUpdate'
   */
/**
   * @swagger
   * /documents/{id}:
   *    delete:
   *      description: Deletes the document with the id supplied as param
   *      tags:
   *        - Delete
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: The document's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: documents
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/DocUpdate'
   */
  .get(Auth.verifyToken,
    Auth.getSingleDocument,
    Document.getDocument)
.put(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Document.update)
.delete(Auth.verifyToken,
    Auth.hasDocumentPermission,
    Document.delete);

/**
 * @swagger
 * definitions:
 *   NewSearchDocument:
 *     type: object
 *   SearchDocument:
 *     allOf:
 *       - $ref: '#/definitions/NewSearchDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
docRouter.route('/search/documents')
/**
   * @swagger
   * /search/documents/?q={document_title}:
   *   get:
   *     description: Returns the documents that matches the title
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: document_title
   *         description: The document's title
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/SearchDocument'
   */
.get(Auth.verifyToken,
  Auth.validateSearch,
  Document.search);


export default docRouter;
