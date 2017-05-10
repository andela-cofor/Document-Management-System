import faker from 'faker';

const helper = {
  regularUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  regularUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  regularUser3: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  
  regularUser4: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  regularUser5: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  regularUser6: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  guestRole1: {
    id: 3,
    title: 'guest'
  },
  guestRole2: {
    id: 4,
    title: 'guest111'
  },
  guestRole3: {
    id: 5,
    title: 'guest2'
  },
  sampleRole: {
    id: 6,
    title: 'guestSample'
  },

  invalidEmailUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'aaaaa',
    password: faker.internet.password(),
  },
  invalidPassword: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'obi',
  },

  firstUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },

  firstUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    rolesId: 1
  },
  firstUser1: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  secondUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  regularRole: {
    id: 1,
    title: 'regular'
  },
  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  }
};
export default helper;
