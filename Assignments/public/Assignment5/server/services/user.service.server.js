var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {

var auth = authorized;

  app.get("/api/assignment/user", findUserByCredentials);
  app.get("/api/assignment/users", findAll);
  app.get("/api/assignment/user/:userId",  findUserById);
  app.get("/api/assignment/user?username=username", findUserByUsername);
  app.post("/api/assignment/createuser", createUser);
  app.delete("/api/assignment/user/:id", deleteUser);
  app.put("/api/assignment/user/:id", updateUser);
  //////////////////////
  app.post  ('/api/login', passport.authenticate('local'), login);
  app.post  ('/api/logout',         logout);
  app.post  ('/api/register',       register);
  app.post  ('/api/user',     auth, createUser);
  app.get   ('/api/loggedin',       loggedin);
  app.get   ('/api/user',     auth, findAllUsers);
  app.put   ('/api/user/:id', auth, updateUser);
  app.delete('/api/user/:id', auth, deleteUser);

  //////////////////////
  // Security
  //////////////////////

  function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  };

  // var userModel = require("../../models/user/user.model.server.js")();
  passport.use(new LocalStrategy(localStrategy));
  function localStrategy(username, password, done) {
    userModel
    .findUserByCredentials({username: username, password: password})
    .then(
      function(user) {
        if (!user) { return done(null, false); }
        return done(null, user);
      },
      function(err) {
        if (err) { return done(err); }
      }
    );
  }

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
    .findUserById(user._id)
    .then(
      function(user){
        done(null, user);
      },
      function(err){
        done(err, null);
      }
    );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register(req, res) {}

  function findAllUsers(req, res) {}

  //////////////////////

  function findUserByCredentials(req, res) {

    console.log("/api/assignment/user", "findUserByCredentials");

    if(req.query.password != null) {

      var cred = {
        username: req.query.username,
        password: req.query.password
      };

      userModel.findUserByCredentials(cred)
      .then(
        function (user) {
          res.json(user);
        },
        function (err) {
          res.status(400).send(err);
        });
      }
      else if (req.query.username !=null) {
        findUserByUsername(req, res);
      }
      else if (req.query.userId != null) {
        findUserById(req, res);
      }
      else findAll(req, res);
    }

    //////////////////////

    function findUserById(req, res) {
      console.log(req.params.userId);
    }

    //////////////////////

    function createUser(req, res) {

      console.log("/api/assignment/createuser", "createUser");

      var user = req.body;
      console.log(user);

      userModel.createUser(user)
      .then(
        function (doc) {
          res.json(doc);
        },
        function (err) {
          res.status(400).send(err);
        })
      }

      //////////////////////

      function findAll(req, res) {

        console.log("/api/assignment/users");

        userModel.findAll()
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          }
        );
      }

      //////////////////////

      function findUserById(req, res) {
        var userId = req.params.id;
        var theUser = userModel.findById(userId);
        res.json(theUser);
      }

      //////////////////////

      function findUserByUsername(req, res) {

        console.log("/api/assignment/user?username=username", "Username is", req.query.username);

        userModel.findUserByUsername(req.query.username)
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          }
        );
      }

      //////////////////////

      function updateUser(req, res) {
        console.log("/api/assignment/user/:id", "The user is", req.body);

        userModel.updateUser(req.params.id, req.body)
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          });
        }

        //////////////////////

        function deleteUser(req, res){

          console.log("/api/assignment/user/:id");

          userModel.deleteUser(req.params.id)
          .then(
            function (doc) {
              res.json(doc);
            },
            function (err) {
              res.status(400).send(err);
            });
          }

          //////////////////////

        }
