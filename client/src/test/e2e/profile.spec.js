import faker from 'faker';
import config from './config';

module.exports = {
  'Profile Page': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
     .setValue('Input[name=password]', 'netbeans')
     .click('button')
     .pause(5000)
     .assert.urlEquals('http://localhost:8080/app/document')
     .assert.elementPresent('#profileNav')
     .click('#profileNav')
     .pause(10000)
     .assert.urlEquals('http://localhost:8080/app/profile')
     .waitForElementVisible('body')
     .setValue('Input[name="firstName"]', faker.lorem.word())
     .setValue('Input[name="lastName"]', faker.lorem.word())
     .setValue('Input[name="username"]', faker.lorem.word())
     .assert.elementPresent('Button')
     .click('Button')
     .end();
  }
};
