import db from '../../app/models/';
import Auth from '../middlewares/Auth';
import Helper from '../Helper/Helper';

const User = {
  /**
    * Creates a new user
    * Route: POST: /
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  create(req, res) {
    db.Users
      .create(req.userInput)
      .then((user) => {
        const token = Auth.getToken(user);
        user = Helper.userProfile(user);
        return res.status(201)
          .send({
            message: 'Your account has been created successfully',
            token,
            user
          });
      })
      .catch(error =>
        res.status(400)
          .send({
            errorArray: Helper.errorArray(error)
          }));
  },
  /**
    * user login
    * Route: POST: /users/login
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  login(req, res) {
    db.Users
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user && user.validPassword(req.body.password)) {
          user.update({ active: true });
          const token = Auth.getToken(user);
          user = Helper.getUserProfile(user);
          return res.status(200)
            .send({
              message: 'You have successfully logged in',
              token,
              user
            });
        }
        res.status(401)
          .send({
            message: 'Please enter a valid email or password to log in'
          });
      });
  },
  /**
    * logout
    * Route: POST: /users/logout
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  logout(req, res) {
    db.Users.findById(req.tokenDecode.userId)
      .then((user) => {
        user.update({ active: false })
          .then(() =>
            res.status(200)
              .send({
                message: 'You have successfully logged out'
              }));
      });
  },
  /**
    * Get all users
    * Route: GET: /users
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getAll(req, res) {
    db.Users
      .findAndCountAll(req.dmsFilter)
      .then((users) => {
        if (users) {
          const condition = {
            count: users.count,
            limit: req.dmsFilter.limit,
            offset: req.dmsFilter.offset
          };
          delete users.count;
          const pagination = Helper.pagination(condition);
          res.status(200)
            .send({
              message: 'You have successfully retrived all users',
              users,
              pagination
            });
        }
      });
  },
  /**
    * Get user by id
    * Route: get: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  getUser(req, res) {
    return res.status(200)
      .send({
        message: 'You have successfully retrived this user',
        user: Helper.getUserProfile(req.getUser)
      });
  },
  /**
    * Update user attribute
    * Route: PUT: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  update(req, res) {
    const errorArray = [];
    req.userInstance.update(req.body)
      .then(updatedUser =>
        res.status(200)
          .send({
            message: 'Your profile has been updated',
            updatedUser
          }))
      .catch((err) => {
        err.errors.forEach((error) => {
          errorArray.push({ path: error.path, message: error.message });
        });
        return res.status(400)
          .send({
            errorArray
          });
      });
  },
  /**
    * Delete a user by id
    * Route: DELETE: /users/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  delete(req, res) {
    req.userInstance.destroy()
      .then(() => {
        res.status(200)
          .send({
            message: 'This account has been successfully deleted'
          });
      })
      .catch(err => res.status(500).send(err.errors));
  },
  /**
    * Get all document by a user
    * Route: GET: /users/:id/documents
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  findUserDocuments(req, res) {
    const userDocuments = {};
    db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        userDocuments.user = Helper.getUserProfile(user);
        req.dmsFilter.where.ownerId = req.params.id;
        req.dmsFilter.attributes = Helper.getDocAttribute();
        db.Documents.findAndCountAll(req.dmsFilter)
          .then((docs) => {
            const condition = {
              count: docs.count,
              limit: req.dmsFilter.limit,
              offset: req.dmsFilter.offset
            };
            delete docs.count;
            const pagination = Helper.pagination(condition);
            userDocuments.documents = docs;
            return res.status(200)
              .send({
                message: 'This user\'s documents was successfully retrieved',
                userDocuments,
                pagination
              });
          });
      });
  },
  /**
    * Get user by username
    * Route: GET: /search/users/?query=
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  getUserName(req, res) {
    return res.status(200)
      .send({
        message: 'You have successfully retrived this user',
        user: Helper.getUserProfile(req.getUser)
      });
  },
};

export default User;
