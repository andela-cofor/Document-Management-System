// import config from './config';

// module.exports = {
//   'Login Users': (browser) => {
//     browser
//       .url(config.url)
//       .waitForElementVisible('body')
//       .click('#login')
//       .setValue('Input[name=email]', 'chinedu.ofor@andela.com')
//       .setValue('Input[name=password]', 'netbeans')
//       .click('button')
//       .pause(1000)
//       .assert.urlEquals('http://localhost:8080/app/document')
//       .end();
//   },
//   'Invalid user': (browser) => {
//     browser
//       .url(config.url)
//       .waitForElementVisible('body')
//       .click('#login')
//       .setValue('Input[name=email]', 'mary@gmail.com')
//       .setValue('Input[name=password]', 'netbeans')
//       .click('button')
//       .pause(1000)
//       .assert.urlContains('login')
//       .end();
//   }
// };
