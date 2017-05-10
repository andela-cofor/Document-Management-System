import config from './config';

module.exports = {
  'All Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
      .setValue('Input[name=password]', 'netbeans')
      .click('button')
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/app/document')
      .assert.elementPresent('#allUsers')
      .click('#allUsers')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/app/users')
      .waitForElementVisible('body')
      .assert.elementPresent('.card')
      .end();
  },
  'View User': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
      .setValue('Input[name=password]', 'netbeans')
      .click('button')
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/app/document')
      .assert.elementPresent('#allUsers')
      .click('#allUsers')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/app/users')
      .waitForElementVisible('body')
      .assert.elementPresent('.card')
      .assert.elementPresent('.eye')
      .click('.eye')
      .pause(5000)
      .assert.elementPresent('.modal-content')
      .end();
  },
  'Delete Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
      .setValue('Input[name=password]', 'netbeans')
      .click('button')
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/app/document')
      .assert.elementPresent('#allUsers')
      .click('#allUsers')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/app/users')
      .waitForElementVisible('body')
      .assert.elementPresent('.card')
      .assert.elementPresent('#delete')
      .click('#delete')
      .end();
  },
  'All Documents': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
      .setValue('Input[name=password]', 'netbeans')
      .click('button')
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/app/document')
      .assert.elementPresent('#allDoc')
      .click('#allDoc')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/app/all/document')
      .waitForElementVisible('body')
      .assert.elementPresent('.card')
      .end();
  }
};
