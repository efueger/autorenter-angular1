const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const distPath = __dirname + '/dist';

// Run the app by serving the static files
// in the dist directory
app.use(express.static(distPath));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(distPath, 'index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(port, function () {
  console.log('Listening on port ' + port);
});