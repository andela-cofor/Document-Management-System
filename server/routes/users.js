import express from 'express';
import Users from '../app/controllers/users';
import Auth from '../app/middlewares/Auth';

const userRouter = express.Router();

// landing page
userRouter.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to Document Management System API'
    });
  });

// Creates a new user.
userRouter.route('/users')
  .get(Auth.verifyToken,
    Auth.validateSearch,
    Users.getAll)
  .post(Auth.validateUserInput, Users.create);

// Logs a user in.
userRouter.route('/users/login')
  .post(Auth.validateLoginInput, Users.login);

// Logs a user out.
userRouter.route('/users/logout')
  .post(Auth.verifyToken, Users.logout);

// Find user, update user attributes and delete user.
userRouter.route('/users/:id')
  .get(Auth.verifyToken, Auth.getSingleUser, Users.getUser)
  .put(Auth.verifyToken, Auth.validateUserUpdate, Users.update)
  .delete(Auth.verifyToken,
    Auth.hasAdminPermission,
    Auth.validateDeleteUser,
    Users.delete);

// Find all documents belonging to the user.
userRouter.route('/users/:id/documents')
  .get(Auth.verifyToken, Auth.validateSearch, Users.findUserDocuments);

// /search/users/?q={username} Search for a user.
userRouter.route('/search/users/')
  .get(Auth.verifyToken, Auth.getUserName, Users.getUserName);

export default userRouter;
