var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var connectionString = 'mongodb://whembree87:gesamt123@ds119078.mlab.com:19078/gesamt';
var db = mongoose.connect(connectionString);
var bcrypt = require('bcryptjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "this is the secret",
    resave : true,
    saveUninitialized : true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public/Project/client'));

require("./public/Project/server/app.js")(app, db, mongoose, bcrypt);

app.listen(process.env.PORT || port);