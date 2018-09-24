var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: "this is the secret",
    resave : true,
    saveUninitialized : true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var connectionString = 'mongodb://whembree87:msdfall16@ds119078.mlab.com:19078/gesamt';

var db = mongoose.connect(connectionString, function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + connectionString);
    }
});

app.use(express.static(__dirname + '/public/Project/client/index.html'));

require("./public/Project/server/app.js")(app, db, mongoose, bcrypt);

app.listen(process.env.PORT || 3000);