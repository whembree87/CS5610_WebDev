var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: "this is the secret",
    // process.env.PASSPORT_SECRET
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// var connectionString = 'mongodb://127.0.0.1:27017/Assignment4/';
var connectionString = 'mongodb://127.0.0.1:27017/Project/';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment5/server/app.js")(app, db, mongoose);
require("./public/Project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
