/* eslint no-unused-expressions: 0 */
import httpMocks from 'node-mocks-http';
import events from 'events';
import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../../server';
import helper from '../helper/test.helper';
import db from '../../app/models';
import Auth from '../../app/middlewares/Auth';

const expect = chai.expect;
const superRequest = supertest(app);

let request;
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe('MIDDLEWARE UNIT TEST', () => {
  let adminToken, regularToken, regularUser;
  let publicDocument, privateDocument;

  before((done) => {
    db.Roles.bulkCreate([{ title: 'admin', id: 1 }, { title: 'regular', id: 2 }])
      .then((roles) => {
          console.log('admmmmmmmm', helper.adminUser6);
          console.log('rege', helper.regularUser6);
        helper.adminUser6.rolesId = roles[0].id;
        helper.regularUser6.rolesId = roles[1].id;
        db.Users.create(helper.adminUser6)
          .then(() => {
            superRequest.post('/users/login')
              .send(helper.adminUser6)
              .end((err, res) => {
                adminToken = res.body.token;
                db.Users.create(helper.regularUser6)
                  .then((reUser) => {
                      console.log('yamhere', reUser.roleId)
                    regularUser = reUser;
                    superRequest.post('/users/login')
                      .send(helper.regularUser6)
                      .end((err, res) => {
                        regularToken = res.body.token;
                        done();
                      });
                  });
              });
          });
      });
  });

  after((done) => {
    db.Roles.destroy({ where: {} });
    done();
  });

  describe('VERIFY TOKEN', () => {
    it('should continue if token is valid', (done) => {
      const response = httpMocks.createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': adminToken }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not continue if token is invalid', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': 'hhehagagagg' }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(request, response, middlewareStub.callback);
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('The token you supplied has expired');
        done();
      });
    });
  });

//   describe('Admin', () => {
//     it('should not continue when requester is not an admin user', (done) => {
//       const response = responseEvent();
//       request = httpMocks.createRequest({
//         method: 'GET',
//         url: '/roles',
//         headers: { 'x-access-token': regularToken },
//         tokenDecode: { roleId: regularUser.rolesId }
//       });
//       const middlewareStub = {
//         callback: () => { }
//       };
//       sinon.spy(middlewareStub, 'callback');
//       Auth.hasAdminPermission(request, response, middlewareStub.callback);
//       response.on('end', () => {
//         expect(response._getData().message).to
//           .equal('You are not permitted to perform this action');
//         done();
//       });
//     });

//     // it('should continue for admin user', (done) => {
//     //   const response = responseEvent();
//     //   request = httpMocks.createRequest({
//     //     method: 'GET',
//     //     url: '/roles',
//     //     headers: { 'x-access-token': adminToken },
//     //     tokenDecode: { roleId: helper.adminUser.roleId }
//     //   });
//     //   const middlewareStub = {
//     //     callback: () => { }
//     //   };
//     //   sinon.spy(middlewareStub, 'callback');
//     //   Auth.hasAdminPermission(request, response, middlewareStub.callback);
//     //   expect(middlewareStub.callback).to.have.been.called;
//     //   done();
//     // });
//   });

  describe('validateUserInput', () => {
    it('should not continue when email is null', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users',
        body: {
          firstname: 'andela',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to.equal('Enter a valid email');
      });
      Auth.validateUserInput(request, response, middlewareStub.callback);
    });

    it('should continue when all the fields are complete', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users',
        body: {
          username: 'andela',
          firstname: 'andela',
          lastname: 'andela',
          email: 'andela@mail.com',
          password: 'password'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.validateUserInput(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });

  describe('validateLoginInput', () => {
    it('should continue when email and password is provided', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/login',
        body: {
          email: helper.adminUser.email,
          password: helper.adminUser.password
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.validateLoginInput(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not continue when password is null', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users/login',
        body: {
          email: 'kk@mail.com',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Please provide your email and password to login');
      });
      Auth.validateLoginInput(request, response, middlewareStub.callback);
    });
  });

  describe('validateUserUpdate', () => {
    // it('should not continue when user want to modify admin profile', () => {
    //   const response = responseEvent();
    //   request = httpMocks.createRequest({
    //     method: 'PUT',
    //     url: '/users/1',
    //     params: {
    //       id: '1'
    //     },
    //     body: {
    //       email: 'new@mail.com',
    //     },
    //   });
    //   const middlewareStub = {
    //     callback: () => { }
    //   };
    //   sinon.spy(middlewareStub, 'callback');
    //   response.on('end', () => {
    //     expect(response._getData().message).to
    //       .equal('You are not permitted to modify the default admin user');
    //   });
    //   Auth.validateUserUpdate(request, response, middlewareStub.callback);
    // });

    it('should continue when user is the owner', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/users/2',
        headers: { 'x-access-token': regularToken },
        body: {
          firstname: 'kkmailcom',
        },
        params: {
          id: regularUser.id
        },
        tokenDecode: { roleId: regularUser.roleId }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.validateUserUpdate(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('getSingleUser', () => {
    it('should not continue when user does not exist', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users/1',
        params: {
          id: 66
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData()).to.equal('This user does not exist');
      });
      Auth.getSingleUser(request, response, middlewareStub.callback);
    });

    it('should continue when user exist', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users/2',
        params: {
          id: regularUser.id
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.getSingleUser(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('validateSearch', () => {
    it('should not continue when limit is negative', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users/search',
        query: {
          limit: -2,
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData()
          .message).to.equal('Only positive number is allowed for limit value');
      });
      Auth.validateSearch(request, response, middlewareStub.callback);
    });

    it('should not continue when offset is negative', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users/search',
        query: {
          offset: -2,
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Only positive number is allowed for offset value');
      });
      Auth.validateSearch(request, response, middlewareStub.callback);
    });
  });

  describe('validateDocumentsInput', () => {
    it('should not continue when title field is missing', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/documents',
        body: {
          content: 'Andela is the name'
        },
        tokenDecode: { userId: 2, roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to.equal('Title field is required');
      });
      Auth.validateDocumentsInput(request, response, middlewareStub.callback);
    });

    it('should not continue when access level is andela', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/documents',
        body: {
          title: 'andela',
          content: 'andela andela',
          access: 'andela'
        },
        tokenDecode: { userId: 2, roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Access type can only be public, private or role');
      });
      Auth.validateDocumentsInput(request, response, middlewareStub.callback);
    });
  });

  describe('getSingleDocument', () => {
    before((done) => {
      superRequest.post('/documents')
        .send(helper.publicDocument)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          publicDocument = res.body.document;
          superRequest.post('/documents')
            .send(helper.privateDocument)
            .set({ 'x-access-token': adminToken })
            .end((error, response) => {
              privateDocument = response.body.document;
              done();
            });
        });
    });
    it('should not continue when document does not exist', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/documents/7',
        params: { id: 7 },
        tokenDecode: { userId: 2, roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('This document cannot be found');
      });
      Auth.getSingleDocument(request, response, middlewareStub.callback);
    });

    it('should not continue when document is private', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/documents/2',
        params: { id: privateDocument.id },
        tokenDecode: { userId: 2, roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('You are not permitted to view this document');
      });
      Auth.getSingleDocument(request, response, middlewareStub.callback);
    });

    it('should continue when document is public', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/documents/1',
        params: { id: publicDocument.id },
        tokenDecode: { userId: 2, roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.getSingleDocument(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('hasDocumentPermission', () => {
    it('should not continue when user is not the owner of the document', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'PUT',
        url: '/documents/1',
        body: {
          content: 'Andela is the name'
        },
        params: {
          id: 1
        },
        tokenDecode: { userId: 2, roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('This document does not exist');
      });
      Auth.hasDocumentPermission(request, response, middlewareStub);
    });

    it('should continue when user is the owner of the document', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/documents',
        body: {
          title: 'andela',
        },
        tokenDecode: { userId: 1, roleId: 1 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.hasDocumentPermission(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('modifyRolePermission', () => {
    it('should not continue when admin want to modify the default admin role',
    () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/roles/1',
        params: {
          id: 1
        },
        tokenDecode: { userId: 1, roleId: 1 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('You are not permitted to modify this role');
      });
      Auth.modifyRolePermission(request, response, middlewareStub.callback);
    });

    it('should not continue when admin want to delete the default regular role',
    (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/roles',
        params: {
          id: 2
        },
        tokenDecode: { userId: 1, roleId: 1 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('You are not permitted to modify this role');
      });
      Auth.modifyRolePermission(request, response, middlewareStub.callback);
      done();
    });
  });
});
