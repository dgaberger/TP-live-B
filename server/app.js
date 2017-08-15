const express = require('express')
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const path = require('path')
const db = require('./models').db
const APIrouter = require('./api')

const app = express()

// middleware
app.use(volleyball)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// static
app.use(express.static(path.join(__dirname, '..', 'public')))

// routing
app.use('/api', APIrouter)

// errors
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("Something went wrong: " + err.message);
});


const port = 8888;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});
