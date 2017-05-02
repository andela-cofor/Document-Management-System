import path from 'path';
import express from 'express';
import User from '../app/controllers/Users';
import Auth from '../app/middlewares/Auth';

const userRouter = express.Router();

// Displays the index page
userRouter.route('/')
  .get((req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
  });

// Creates a new user
/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - firstName
 *       - lastName
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users')
  /**
   * @swagger
   * /users:
   *   get:
   *     description: Returns users
   *     tags:
   *      - Find Users
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
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/User'
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     description: Creates new user
   *     tags:
   *      - Create
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .get(Auth.verifyToken,
    Auth.validateSearch,
    User.getAll)
  .post(Auth.validateUserInput, User.create);

// Logs a user in
/**
 * @swagger
 * definitions:
 *   NewLogin:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *   Login:
 *     allOf:
 *       - $ref: '#/definitions/NewLogin'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/login')
  /**
   * @swagger
   * /users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Authentication
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Login'
   */
  .post(Auth.validateLoginInput, User.login);

// Logs a user out
/**
 * @swagger
 * definitions:
 *   NewLogout:
 *     type: object
 *   Logout:
 *     allOf:
 *       - $ref: '#/definitions/NewLogout'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/logout')
  /**
   * @swagger
   * /users/logout:
   *   post:
   *     description: Logs out a user
   *     tags:
   *      - Authentication
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Logout'
   */
  .post(Auth.verifyToken, User.logout);

// Find, Update and Delete user
/**
 * @swagger
 * definitions:
 *   NewUpdate:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - firstName
 *       - lastName
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *   Update:
 *     allOf:
 *       - $ref: '#/definitions/NewUpdate'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/:id')
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     description: Returns a particular user
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The user's id
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
   *             $ref: '#/definitions/Update'
   */

   /**
   * @swagger
   * /users/{id}:
   *   put:
   *     description: Updates the user signed in
   *     tags:
   *      - Update
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: id
   *          description: The user's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: user
   *          description: User object
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *            $ref: '#/definitions/NewUpdate'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Update'
   */

   /**
   * @swagger
   * /users/{id}:
   *    delete:
   *      description: Deletes the user with the id supplied as param
   *      tags:
   *        - Delete
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: The user's id
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
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Update'
   */
  .get(Auth.verifyToken, Auth.getSingleUser, User.getUser)
  .put(Auth.verifyToken, Auth.validateUserUpdate, User.update)
  .delete(Auth.verifyToken, Auth.validateDeleteUser,
   Auth.hasAdminPermission, User.delete);

// Find all documents belonging to the user.
/**
 * @swagger
 * definitions:
 *   NewFetchDoc:
 *     type: object
 *   FetchDoc:
 *     allOf:
 *       - $ref: '#/definitions/NewFetchDoc'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/:id/documents')
  /**
   * @swagger
   * /users/{id}/documents:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The user's id
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
   *             $ref: '#/definitions/FetchDoc'
   */
  .get(Auth.verifyToken, Auth.validateSearch, User.findUserDocuments);

// Search for a user
/**
 * @swagger
 * definitions:
 *   NewSearchUser:
 *     type: object
 *   SearchUser:
 *     allOf:
 *       - $ref: '#/definitions/NewSearchUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/search/users/')
  /**
   * @swagger
   * /search/users/?q={username}:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: username
   *         description: The user's username
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
   *             $ref: '#/definitions/SearchUser'
   */
  .get(Auth.verifyToken, Auth.getUserName, User.getUserName);

export default userRouter;
