import request from 'supertest';
import chai from 'chai';
import app from '../../../server';
import db from '../../app/models';
import helper from '../helper/test.helper';

const superRequest = request.agent(app);
const expect = chai.expect;

const adminParams = helper.firstUser2;
const adminRoleParams = helper.adminRole;
const regularRoleParams = helper.regularRole1;

let adminToken, reguToken;
let role;

describe('ROLE API', () => {
  before((done) => {
    db.Roles.create(adminRoleParams)
      .then((newRole) => {
        adminParams.rolesId = newRole.id;
        db.Users.create(adminParams)
          .then(() => {
            superRequest.post('/users/login')
              .send(adminParams)
              .end((err, res) => {
                adminToken = res.body.token;
                done();
              });
          });
      });
  });

  after(() => db.Roles.destroy({ where: {} }));

  describe('ADMIN', () => {
    it('should allow admin to create a role', (done) => {
        console.log('this is', regularRoleParams);
      superRequest.post('/roles')
        .send(regularRoleParams)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
            console.log('iiiiiiiiiii', res.body);
          expect(res.status).to.equal(201);
          expect(res.body.roles.title).to.equal(regularRoleParams.title);
          done();
        });
    });

    it('should return error for empty string title', (done) => {
      superRequest.post('/roles')
        .send({ title: '' })
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errorArray[1].message).to
            .equal('This field cannot be empty');
          done();
        });
    });

    it('should return varification failed when no token is supplied',
    (done) => {
      superRequest.post('/roles')
        .send(helper.guestRole1)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to
            .equal('Please sign in or register to get a token');
          done();
        });
    });

    it('should not allow regular user to create a role', (done) => {
      superRequest.post('/users')
        .send(helper.regularUser4)
        .end((err, res) => {
          console.log('tgeh ', res.body);
          reguToken = res.body.token;
          superRequest.post('/roles')
            .send(helper.sampleRole)
            .set({ 'x-access-token': reguToken })
            .end((er, re) => {
              expect(re.status).to.equal(403);
              expect(re.body.message).to
                .equal('You are not permitted to perform this action');
              done();
            });
        });
    });
  });

  describe('DELETE ROLE, DELETE /roles', () => {
    before((done) => {
      superRequest.post('/roles')
        .send(helper.guestRole1)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          role = res.body.roles;
          done();
        });
    });

    it('should delete a role', (done) => {
      superRequest.delete(`/roles/${role.id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('This role has been deleted');
          done();
        });
    });

    it('should not allow regular user to delete a role', (done) => {
      superRequest.delete(`/roles/${role.id}`)
        .set({ 'x-access-token': reguToken })
        .end((er, re) => {
          expect(re.status).to.equal(403);
          expect(re.body.message).to
            .equal('You are not permitted to perform this action');
          done();
        });
    });

    it('should return id not found for invalid id', (done) => {
      superRequest.delete('/roles/999')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This role does not exist');
          done();
        });
    });
  });

  describe('GET BY ID', () => {
    before((done) => {
      superRequest.post('/roles')
        .send(helper.guestRole2)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          role = res.body.roles;
          done();
        });
    });

    it('should return role when provided with valid id', (done) => {
      superRequest.get(`/roles/${role.id}`)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          console.log('Good morning', res.body);
          expect(res.status).to.equal(200);
          expect(res.body.message).to
            .equal('This role has been retrieved successfully');
          expect(res.body.roles.title).to.equal(role.title);
          done();
        });
    });

    it('should not allow regular user to get role', (done) => {
      superRequest.get(`/roles/${role.id}`)
        .set({ 'x-access-token': reguToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to
            .equal('You are not permitted to perform this action');
          done();
        });
    });

    it('should return not found when provided with invalid id', (done) => {
      superRequest.get('/roles/9999')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This role does not exist');
          done();
        });
    });
  });

  describe('UPDATE PUT /roles/:id', () => {
    let newRole;
    before((done) => {
      superRequest.post('/roles')
        .send(helper.guestRole3)
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          newRole = res.body.roles;
          done();
        });
    });

    it('should update a role when given a valid id', (done) => {
      superRequest.put(`/roles/${newRole.id}`)
        .send({ title: 'andela' })
        .set({ 'x-access-token': adminToken })
        .end((er, re) => {
          expect(re.status).to.equal(200);
          expect(re.body.message).to.equal('This role has been updated');
          expect(re.body.updatedRole.title).to.equal('andela');
          done();
        });
    });

    it('should not update a role when given an empty title string', (done) => {
      superRequest.put(`/roles/${newRole.id}`)
        .send({ title: '' })
        .set({ 'x-access-token': adminToken })
        .end((er, re) => {
          expect(re.status).to.equal(400);
          expect(re.body.message).to
            .equal('Please input a value to update role with');
          done();
        });
    });

    it('should not allow regular user to update role', (done) => {
      superRequest.get(`/roles/${newRole.id}`)
        .set({ 'x-access-token': reguToken })
        .end((er, re) => {
          expect(re.status).to.equal(403);
          expect(re.body.message).to
            .equal('You are not permitted to perform this action');
          done();
        });
    });

    it('should return not found for invalid id', (done) => {
      superRequest.put('/roles/999')
        .send({ title: 'talent' })
        .set({ 'x-access-token': adminToken })
        .end((error, resp) => {
          expect(resp.status).to.equal(404);
          expect(resp.body.message).to.equal('This role does not exist');
          done();
        });
    });
  });

  describe('GET ALL ROLES GET /roles', () => {
    before((done) => {
      superRequest.post('/roles')
        .send(helper.guestRole1)
        .set({ 'x-access-token': adminToken });
      done();
    });

    it('it should allow admin to view all roles', (done) => {
      superRequest.get('/roles')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to
            .equal('You have successfully retrived all roles');
          expect(res.body.roles.length).to.be.greaterThan(0);
          done();
        });
    });

    it('should not allow regular user to view all roles', (done) => {
      superRequest.get('/roles')
        .set({ 'x-access-token': reguToken })
        .end((er, re) => {
          expect(re.status).to.equal(403);
          expect(re.body.message).to
            .equal('You are not permitted to perform this action');
          done();
        });
    });
  });
});
