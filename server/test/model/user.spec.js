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

  // describe('Unique', () => {
  //   uniqueFields.forEach((field) => {
  //     const uniqueTest = Object.assign({}, helper.firstUser);
  //     uniqueTest[field] = helper.regularUser[field];
  //     it(`should fails for existing ${field}`, (done) => {
  //       db.Users.create(uniqueTest)
  //       .then()
  //       .catch((error) => {
  //         console.log(error.errors);
  //         expect(error.errors[0].message).to.equal(`${field} already exist`);
  //         expect(error.errors[0].type).to.equal('unique violation');
  //         expect(error.errors[0].path).to.equal(field);
  //         done();
  //       });
  //     });
  //   });
  // });

  describe('NOT NULL VOILATIONS', () => {
    requiredFields.forEach((field) => {
      it(`should fail when ${field} is null`, (done) => {
        const nullField = Object.assign({}, helper.secondUser);
        nullField[field] = null;
        db.Users.create(nullField)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal(`${field} cannot be null`);
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
      });
    });
  });

  describe('Empty string Violations', () => {
    emptyFields.forEach((field) => {
      it(`should fail when ${field} is empty`, (done) => {
        const emptyField = Object.assign({}, helper.secondUser);
        emptyField[field] = '';
        db.Users.create(emptyField)
          .then()
          .catch((error) => {
            expect(error.errors[0].message)
              .to.equal('This field cannot be empty');
            expect(error.errors[0].type).to.equal('Validation error');
            expect(error.errors[0].path).to.equal(field);
            done();
          });
      });
    });
  });

  describe('Login In', () => {
    let decryptPassword;
    it('should login a user', () => {
      db.Users.findOne({ where: { email: regularUser.email } })
        .then((user) => {
          decryptPassword = user.validPassword(helper.regularUser.password);
          expect(decryptPassword).to.be.equal(true);
          expect(user.password).to.not.equal(helper.regularUser.password);
        });
    });
  });

  describe('Update user', () => {
    const UpdateUser = {};
    beforeEach((done) => {
      const updateData = { firstName: 'ofor', password: 'mypassword' };
      db.Users.findById(regularUser.id)
      .then((user) => {
        user.update(updateData)
        .then((upUser) => {
          Object.assign(UpdateUser, upUser.dataValues);
          done();
        });
      });
    });
    it('should ensure that password is hashed', (done) => {
      db.Users.findById(UpdateUser.id)
      .then((user) => {
        expect(user.dataValues.password).is.not.equal(regularUser.password);
        expect(user.dataValues.id).to.equal(regularUser.id);
        expect(user.dataValues.firstName).to.not.equal(regularUser.firstname);
        expect(user.dataValues.email).to.equal(regularUser.email);
        done();
      });
    });
  });
});
