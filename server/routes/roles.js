import express from 'express';
import Roles from '../app/controllers/roles';
import Auth from '../app/middlewares/Auth';

const rolesRouter = express.Router();

// Creates a new rolesRouter
rolesRouter.route('/roles')
  .post(Auth.verifyToken,
    Auth.hasAdminPermission,
    Roles.create)
  .get(Auth.verifyToken,
    Auth.hasAdminPermission,
    Roles.getAll);


rolesRouter.route('/roles/:id')
  .put(Auth.verifyToken,
    Auth.hasAdminPermission,
    Auth.checkTitle,
    Auth.modifyRolePermission,
    Roles.update)
  .get(Auth.verifyToken,
    Auth.hasAdminPermission,
    Roles.getRoleById)
  .delete(Auth.verifyToken,
    Auth.hasAdminPermission,
    Auth.modifyRolePermission,
    Roles.delete);


export default rolesRouter;
