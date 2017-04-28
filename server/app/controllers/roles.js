import db from '../../app/models/index';
import Helper from '../Helper/Helper';

const Role = {
  /**
    * Create a new role
    * Route: POST: /roles/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  create(req, res) {
    db.Roles
      .create(req.body)
      .then((roles) => {
        res.status(201)
          .send({
            message: 'Role has been created',
            roles
          });
      })
      .catch(error =>
        res.status(400)
          .send({
            errorArray: Helper.errorArray(error)
          }));
  },
  /**
    * Get all roles
    * Route: GET: /roles/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getAll(req, res) {
    db.Roles
      .findAll()
      .then((roles) => {
        res.status(200)
        .send({
          message: 'You have successfully retrived all roles',
          roles
        });
      });
  },
  /**
    * Update roles
    * Route: PUT: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  update(req, res) {
    req.roleInstance.update(req.body)
      .then((updatedRole) => {
        res.status(200)
          .send({
            message: 'This role has been updated',
            updatedRole
          });
      })
      .catch(error =>
        res.status(400)
          .send({
            errorArray: Helper.errorArray(error)
          }));
  },
  /**
    * Get role by id
    * Route: GET: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {Response|void} no returns
    */
  getRoleById(req, res) {
    db.Roles
      .findById(req.params.id)
      .then((roles) => {
        if (!roles) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        res.status(200)
         .send({
           message: 'This role has been retrieved successfully',
           roles
         });
      });
  },
  /**
    * Delete a Role
    * Route: DELETE: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  delete(req, res) {
    req.roleInstance.destroy()
      .then(() => {
        res.status(200)
          .send({
            message: 'This role has been deleted'
          });
      });
  },
};

export default Role;
