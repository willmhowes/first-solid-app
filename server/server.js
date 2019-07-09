const express = require('express');

// get an instance of express
const app = express();

// Use the public directory we made for static files
app.use(express.static('server/public'));

// set port number, direct port listener
const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});
