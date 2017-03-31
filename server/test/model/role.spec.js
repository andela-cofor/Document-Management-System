import chai from 'chai';
import db from '../../app/models/';
import helper from '../helper/test.helper';

const expect = chai.expect;

describe('Role', () => {
  let regularRole;
  after((done) => {
    db.Roles.destroy({ where: {} });
    done();
  });

  describe('Create Role', () => {
    it('should create a role', (done) => {
      db.Roles.create(helper.regularRole)
        .then((role) => {
          regularRole = role.dataValues;
          expect(role.dataValues.title)
            .to.equal(helper.regularRole.title);
          expect(role.dataValues.id)
            .to.equal(helper.regularRole.id);
          done();
        });
    });

    it('should fail when role id and title already exist', (done) => {
      const newRole = { id: 1, title: 'regular' };
      db.Roles.create(newRole)
        .then()
        .catch((error) => {
          expect(error.errors[0].message)
            .to.equal('id must be unique');
          expect(error.errors[0].type)
            .to.equal('unique violation');
          expect(error.errors[0].path)
            .to.equal('id');
          expect(error.errors[0].value)
            .to.equal(`${helper.regularRole.id}`);
          done();
        });
    });

    describe('NOT NULL violation', () => {
      it('should fail when title of a role is null', (done) => {
        const nullTitle = { title: null };
        db.Roles.create(nullTitle)
          .then()
          .catch((error) => {
            expect(error.errors[0].message)
              .to.equal('title cannot be null');
            expect(error.errors[0].type)
              .to.equal('notNull Violation');
            expect(error.errors[0].value)
              .to.equal(null);
            expect(error.errors[0].path)
              .to.equal('title');
            done();
          });
      });
    });

    describe('EMPTY String violation', () => {
      it('should fail for empty string title', (done) => {
        const emptyTitle = { title: ' ' };
        db.Roles.create(emptyTitle)
          .then()
          .catch((error) => {
            expect(error.errors[0].message)
              .to.equal('Input a valid title');
            expect(error.errors[0].type)
              .to.equal('Validation error');
            expect(error.errors[1].message)
              .to.equal('This field cannot be empty');
            expect(error.errors[0].path)
              .to.equal('title');
            done();
          });
      });
    });

    describe('Update Role', () => {
      let newRole;
      before((done) => {
        db.Roles.findById(regularRole.id)
          .then((role) => {
            role.update({ title: 'staff' })
              .then((updatedRole) => {
                newRole = updatedRole;
                done();
              });
          });
      });

      it('should update a role', (done) => {
        db.Roles.findById(newRole.id)
          .then((role) => {
            expect(role.dataValues.id)
            .to.equal(regularRole.id);
            expect(role.dataValues.title)
            .to.not.equal(regularRole.title);
            expect(role.dataValues.title)
            .to.equal('staff');
            done();
          });
      });
    });

    describe('DELETE role', () => {
      it('should delete a role', (done) => {
        db.Roles.destroy({ where: { id: regularRole.id } })
          .then(() => {
            db.Roles.findById(regularRole.id)
              .then((res) => {
                expect(res)
                .to.equal(null);
                done();
              });
          });
      });
    });
  });
});
