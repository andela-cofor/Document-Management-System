const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {
 res.send({message: "welcome to document management system"});
});

app.listen(port, function() {
   console.log(`Our app is running on http://localhost:${port}`);
});
