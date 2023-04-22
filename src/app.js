/* eslint-disable max-len */
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const { cloudinary } = require("./utils/cloudinary");
const http = require('http');


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  // eslint-disable-next-line max-len
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token, id, storename, user_email');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});

//todo se realiza la logia del auth de terceros
server.use(require('express-session')({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());




server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
});

//const app = http.createServer(server);
// module.exports = app;


module.exports = server;
