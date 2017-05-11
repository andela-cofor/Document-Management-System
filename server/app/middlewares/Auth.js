import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../app/models/index';
import Helper from '../Helper/Helper';

dotenv.config();

const secretKey = process.env.SECRET;

const Auth = {
  /**
   * Get token
   * @param {Object} user user's object
   * @returns {Boolean} true or false
   */
  getToken(user) {
    const userToken = jwt.sign({
      userId: user.id
    },
      secretKey, { expiresIn: '7d' }
    );
    return userToken;
  },
  /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateUserInput(req, res, next) {
    if (req.body.rolesId && req.body.rolesId === 1) {
      return res.status(403)
        .send({
          message: 'Permission denied, You cannot sign up as an admin user'
        });
    }
    let username = /\w+/g.test(req.body.username);
    let firstName = /\w+/g.test(req.body.firstName);
    let lastName = /\w+/g.test(req.body.lastName);
    let email = /\S+@\S+\.\S+/.test(req.body.email);
    let password = /\w+/g.test(req.body.password);

    if (!username) {
      return res.status(400)
        .send({
          message: 'Enter a valid username'
        });
    }
    if (!firstName) {
      return res.status(400)
        .send({
          message: 'Enter a valid firstName'
        });
    }
    if (!lastName) {
      return res.status(400)
        .send({
          message: 'Enter a valid lastName'
        });
    }
    if (!email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
    if (req.body.password && req.body.password.length < 8) {
      return res.status(400)
        .send({
          message: 'Minimum of 8 characters is allowed for password'
        });
    }

    db.Users.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.status(409)
            .send({
              message: 'email already exists'
            });
        }
        db.Users.findOne({ where: { username: req.body.username } })
          .then((newUser) => {
            if (newUser) {
              return res.status(409)
                .send({
                  message: 'username already exists'
                });
            }
            username = req.body.username;
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            email = req.body.email;
            password = req.body.password;
            const rolesId = req.body.rolesId || 2;
            req.userInput =
            { username, firstName, lastName, rolesId, email, password };
            next();
          });
      });
  },
  /**
   * Validate user's login datas
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateLoginInput(req, res, next) {
    if (!req.body.password || !req.body.email) {
      return res.status(400)
        .send({
          message: 'Please provide your email and password to login'
        });
    }

    const email = /\S+@\S+\.\S+/.test(req.body.email);
    const password = /\w+/g.test(req.body.password);

    if (!email || !password) {
      return res.status(400)
        .send({
          message: 'Please enter a valid email and password'
        });
    }
    next();
  },
  /**
   * Varify user token
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next move to next controller handler
   * @returns {void} no returns
   */
  verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401)
            .send({
              message: 'The token you supplied has expired'
            });
        }
        db.Users.findById(decoded.userId)
          .then((user) => {
            if (!user) {
              return res.status(404)
                .send({
                  message: 'Account not found, Sign Up or sign in to get access'
                });
            }
            if (!user.active) {
              return res.status(401)
                .send({
                  message: 'Please sign in to access your account'
                });
            }
            req.tokenDecode = decoded;
            req.tokenDecode.rolesId = user.rolesId;
            next();
          });
      });
    } else {
      res.status(400)
        .send({
          message: 'Please sign in or register to get a token'
        });
    }
  },
  /**
   * Validate search
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateSearch(req, res, next) {
    const query = {};
    const terms = [];
    const userQuery = req.query.query;
    const searchArray =
      userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const publishedDate = req.query.publishedDate;
    const order =
      publishedDate && publishedDate === 'ASC' ? publishedDate : 'DESC';

    if (limit < 0 || !/^([1-9]\d*|0)$/.test(limit)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for limit value'
        });
    }

    if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for offset value'
        });
    }

    if (searchArray) {
      searchArray.forEach((word) => {
        terms.push(`%${word}%`);
      });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];

    if (`${req.baseUrl}${req.route.path}` === '/search/users') {
      if (!req.query.query) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      query.where = {
        $or: [
          { username: { $iLike: { $any: terms } } },
          { firstname: { $iLike: { $any: terms } } },
          { lastname: { $iLike: { $any: terms } } },
          { email: { $iLike: { $any: terms } } }
        ]
      };
    }
    if (`${req.baseUrl}${req.route.path}` === '/users') {
      query.where = Helper.isAdmin(req.tokenDecode.rolesId)
        ? {}
        : { id: req.tokenDecode.userId };
    }
    if (`${req.baseUrl}${req.route.path}` === '/search/documents') {
      if (!req.query.query) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      if (Helper.isAdmin(req.tokenDecode.rolesId)) {
        query.where = Helper.likeSearch(terms);
      } else {
        query.where = {
          $and: [Helper.docAccess(req), Helper.likeSearch(terms)]
        };
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/documents') {
      if (Helper.isAdmin(req.tokenDecode.rolesId)) {
        query.where = {};
      } else {
        query.where = Helper.docAccess(req);
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/:id/documents') {
      const adminSearch = req.query.query ? Helper.likeSearch(terms) : { };
      const userSearch = req.query.query
        ? [Helper.docAccess(req), Helper.likeSearch(terms)]
        : Helper.docAccess(req);
      if (Helper.isAdmin(req.tokenDecode.rolesId)) {
        query.where = adminSearch;
      } else {
        query.where = userSearch;
      }
    }
    req.dmsFilter = query;
    next();
  },
  /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleUser(req, res, next) {
    db.Users
      .findOne({
        where: { id: req.params.id },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },
  /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserUpdate(req, res, next) {
    if (!(Helper.isAdmin(req.tokenDecode.rolesId) || Helper.isOwner(req))) {
      return res.status(401)
        .send({
          message: 'You are not permitted to update this profile'
        });
    }
    if (!!req.body.rolesId && req.body.rolesId === '1') {
      if (!Helper.isAdmin(req.tokenDecode.rolesId)) {
        return res.status(403)
          .send({
            message: 'You are not permitted to update role to admin'
          });
      }
    }
    if (req.body.id) {
      return res.status(403)
        .send({
          message: 'You are not permitted to update your id'
        });
    }
    db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.userInstance = user;
        next();
      });
  },
  /**
   * Check for admin permission
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next move to next controller handler
   * @returns {Object} Object
   */
  hasAdminPermission(req, res, next) {
    db.Users
      .findById(req.tokenDecode.userId)
      .then((user) => {
        if (user.rolesId === 1) {
          next();
        } else {
          return res.status(403)
            .send({
              message: 'You are not permitted to perform this action'
            });
        }
      });
  },
  /**
   * Validate user to delete, make sure it not admin user
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateDeleteUser(req, res, next) {
    db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        if (Helper.isAdmin(user.rolesId) && user.id === 1) {
          return res.status(403)
            .send({
              message: 'You can not delete the default admin user'
            });
        }
        if (Helper.isRegular(user.rolesId) && user.id === 2) {
          return res.status(403)
            .send({ message: 'You can not delete the default regular user' });
        }
        req.userInstance = user;
        next();
      });
  },
  /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getUserName(req, res, next) {
    db.Users
      .findOne({
        where: { username: req.query.q },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },
  /**
   * Check for role edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  modifyRolePermission(req, res, next) {
    db.Roles.findById(req.params.id)
      .then((roles) => {
        if (!roles) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        if (Helper.isAdmin(roles.id) || Helper.isRegular(roles.id)) {
          return res.status(403)
            .send({
              message: 'You are not permitted to modify this role'
            });
        }
        req.roleInstance = roles;
        next();
      });
  },
  /**
   * Checks if title is present in the request body
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  checkTitle(req, res, next) {
    db.Roles.findById(req.params.id)
      .then(() => {
        if (!req.body.title) {
          return res.status(400)
            .send({
              message: 'Please input a value to update role with'
            });
        }
        next();
      });
  },
  
  /**
   * Validate documents input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateDocumentsInput(req, res, next) {
    const title = /\w+/g.test(req.body.title);
    const content = /\w+/g.test(req.body.content);
    if (!req.body.title) {
      return res.status(400)
        .send({
          message: 'Title field is required'
        });
    }
    if (!req.body.content) {
      return res.status(400)
        .send({
          message: 'Content field is required'
        });
    }
    if (!title) {
      return res.status(400)
        .send({
          message: 'Please enter a valid title'
        });
    }
    if (!content) {
      return res.status(400)
        .send({
          message: 'Please enter a valid content'
        });
    }
    if (req.body.access
      && !['public', 'private', 'role'].includes(req.body.access)) {
      return res.status(400)
        .send({
          message: 'Access type can only be public, private or role'
        });
    }
    req.docInput = {
      title: req.body.title,
      content: req.body.content,
      ownerId: req.tokenDecode.userId,
      access: req.body.access,
      ownerRoleId: req.tokenDecode.roleId
    };
    next();
  },
  /**
   * Get a single user's document
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleDocument(req, res, next) {
    db.Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.tokenDecode.roleId)
           && !Helper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },
  /**
   * Check for document edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  hasDocumentPermission(req, res, next) {
    db.Documents.findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({
              message: 'This document does not exist'
            });
        }
        if (!Helper.isOwnerDoc(doc, req)
          && !Helper.isAdmin(req.tokenDecode.roleId)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to modify this document'
            });
        }
        req.docInstance = doc;
        next();
      });
  },
  /**
   * Get a user's document after searching by title
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getDocByTitle(req, res, next) {
    db.Documents
      .findOne({
        where: { title: req.query.q },
      })
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.tokenDecode.rolesId)
           && !Helper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },
};

export default Auth;
