import chai from 'chai';
import db from '../../app/models/';
import helper from '../helper/test.helper';

const expect = chai.expect;

describe('User Model', () => {
  const requiredFields = [
    'username',
    'firstName',
    'lastName',
    'email',
    'password'
  ];
  const uniqueFields = ['username', 'email'];
  const emptyFields = ['firstName', 'lastName'];
  const defaultRoleId = 2;
  let regularUser;

  before((done) => {
    db.Roles.create({ title: 'regular', id: 2 }).then(() => {
      done();
    });
  });
  after((done) => { db.Roles.destroy({ where: {} }); done(); });

  describe('Create user', () => {
    it('should create a user', (done) => {
      db.Users.create(helper.regularUser)
      .then((user) => {
        regularUser = user.dataValues;
        expect(user.dataValues.firstName)
        .to.equal(helper.regularUser.firstName);
        expect(user.dataValues.lastName)
        .to.equal(helper.regularUser.lastName);
        expect(user.dataValues.username)
        .to.equal(helper.regularUser.username);
        expect(user.dataValues.email)
        .to.equal(helper.regularUser.email);
        expect(user.dataValues.password)
        .to.not.equal(helper.regularUser.password);
        expect(user.dataValues.rolesId)
        .to.equal(defaultRoleId);
        done();
      });
    });

    it('should not create a user when email is invalid', (done) => {
      db.Users.create(helper.invalidEmailUser)
      .then()
      .catch((error) => {
        expect(error.errors[0].message)
        .to.equal('Input a valid email address');
        expect(error.errors[0].type)
        .to.equal('Validation error');
        expect(error.errors[0].path)
        .to.equal('email');
        done();
      });
    });

    it('should not create password which is not up to 8 characters', (done) => {
      db.Users.create(helper.invalidPassword)
      .then()
      .catch((error) => {
        expect(error.errors[0].message)
        .to.equal('Minimum of 8 characters is required');
        expect(error.errors[0].type)
        .to.equal('Validation error');
        expect(error.errors[0].path)
        .to.equal('validatePassword');
        done();
      });
    });
  });
});
