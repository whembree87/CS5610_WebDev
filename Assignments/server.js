var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid=require('node-uuid');
var cookieParser = require('cookie-parser');
var public_folder = __dirname + '/public';
var app = express();
//app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(public_folder));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment3/server/app.js")(app);

app.listen(port, ipaddress);
