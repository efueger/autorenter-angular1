const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default
// Heroku port
app.listen(port, function () {
  console.log('Listening on port ' + port);
});