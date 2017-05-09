const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        username: 'chinex',
        firstName: 'chinedu',
        lastName: 'ofor',
        email: 'chinedu.ofor@andela.com',
        password: bcrypt.hashSync('netbeans', bcrypt.genSaltSync(8)),
        rolesId: '1',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test',
        firstName: 'tester',
        lastName: 'testing',
        email: 'test@gmail.com',
        password: bcrypt.hashSync('netbeans', bcrypt.genSaltSync(8)),
        rolesId: '2',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
