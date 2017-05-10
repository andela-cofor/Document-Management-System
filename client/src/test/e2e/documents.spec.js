import faker from 'faker';
import config from './config';

module.exports = {
  'Create document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
     .setValue('Input[name=password]', 'netbeans')
     .click('button')
     .pause(5000)
     .assert.urlEquals('http://localhost:8080/app/document')
     .waitForElementVisible('body')
     .assert.elementPresent('#hero-btn')
     .click('.add')
     .pause(5000)
     .assert.urlEquals('http://localhost:8080/app/create')
     .waitForElementVisible('body')
     .setValue('Input[name="title"]', faker.lorem.word())
     .execute('FroalaEditor.setContent("This is my new content!")')
     .click('#access option[value="private"]')
     .assert.elementPresent('Button')
     .click('Button')
     .end();
  },
  'View document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
     .setValue('Input[name=password]', 'netbeans')
     .click('button')
     .pause(5000)
     .assert.elementPresent('.eye')
     .click('.eye')
     .pause(5000)
     .assert.elementPresent('.modal-content')
     .end();
  },
  'Edit document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
     .setValue('Input[name=password]', 'netbeans')
     .click('button')
     .pause(5000)
     .assert.elementPresent('#editLink')
     .click('#editLink')
     .pause(5000)
     .execute('FroalaEditor.setContent("This is my new content!")')
     .assert.elementPresent('#update')
     .click('#update')
     .pause(5000)
     .assert.urlEquals('http://localhost:8080/app/document')
     .end();
  },
  'Delete document': (browser) => {
    browser
     .url(config.url)
     .click('#login')
     .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
     .setValue('Input[name=password]', 'netbeans')
     .click('button')
     .pause(5000)
     .assert.elementPresent('#delete')
     .click('#delete')
     .assert.urlEquals('http://localhost:8080/app/document#')
     .end();
  }
};

