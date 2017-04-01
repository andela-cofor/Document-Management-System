import chai from 'chai';
import db from '../../app/models/';
import config from '../../config/config';

const expect = chai.expect;

describe('Created Models', () => {
  it('should have User Model Created', () => {
    expect(db.Users).to.exist;
  });

  it('should have Role Model Created', () => {
    expect(db.Roles).to.exist;
  });

  it('should have Document Model Created', () => {
    expect(db.Documents).to.exist;
  });

  it('should have a config.js file', () => {
    expect(config).to.exist;
  });
});
