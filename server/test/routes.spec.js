const request = require('supertest');
const server = require('../../server');

describe('Index Route', () => {
  it('should correctly load the index route', (done) => {
    request(server).get('/').expect(200, done);
  });
});
