var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {

  var auth = authorized;

  app.post  ("/api/project/login", passport.authenticate('local'), login);
  app.post  ("/api/project/logout", logout);
  app.post  ("/api/project/register", register);
  // app.post  ("/api/assignment/register", register);
  app.post  ("/api/assignment/admin/createuser", auth, createUser);
  // app.get   ("/api/assignment/loggedin", loggedin);
  app.get   ("/api/project/admin/user", auth, isAdmin, findAllUsers);
  app.put   ("/api/assignment/admin/user/:userId", auth, isAdmin, updateUser);
  app.delete("/api/assignment/admin/user/:userId", auth, isAdmin, deleteUser);

  //////////////////////

  function authorized (req, res, next) {

    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  };

  //////////////////////

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function localStrategy(username, password, done) {

    console.log("localStrategy");

    userModel
    .findUserByCredentials({username: username, password: password})
    .then(
      function(user) {
        console.log("The User is", user);
        if (!user) { return done(null, false); }
        return done(null, user);
      },
      function(err) {
        if (err) { return done(err); }
      }
    );
  }

  //////////////////////

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

  //////////////////////

  function login(req, res) {

    var user = req.user;

    res.json(user);

  }

  //////////////////////

  function logout(req, res) {

    req.logOut();

    res.send(200);

  }


  //////////////////////

  function loggedin(req, res) {

    res.send(req.isAuthenticated() ? req.user : '0');

  }

  //////////////////////

  function register(req, res) {

    var newUser = req.body;
    console.log(req.body);
    newUser.roles = ['student'];

    userModel
    .findUserByUsername(newUser.username)
    .then(
      function(user){
        if(user) {
          res.json(null);
        } else {
          return userModel.createUser(newUser);
        }
      },
      function(err){
        res.status(400).send(err);
      }
    )
    .then(
      function(user){
        if(user){
          req.login(user, function(err) {
            if(err) {
              res.status(400).send(err);
            } else {
              res.json(user);
            }
          });
        }
      },
      function(err){
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function findAllUsers(req, res) {

    userModel.findAllUsers()
    .then(
      function (users) {
        res.json(users);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function isAdmin(req, res, next) {
    if(req.user.roles.indexOf("admin") === -1) {
      res.send(403);
    }
    next();
  }

  //////////////////////

  function createUser(req, res) {

    var newUser = req.body;

    if(newUser.roles && newUser.roles.length > 1) {
      newUser.roles = newUser.roles.split(",");
    } else {
      newUser.roles = ["student"];
    }

    // first check if a user already exists with the username
    userModel
    .findUserByUsername(newUser.username)
    .then(
      function(user){
        // if the user does not already exist
        if(user == null) {
          // create a new user
          return userModel.createUser(newUser)
          .then(
            // fetch all the users
            function(){
              return userModel.findAllUsers();
            },
            function(err){
              res.status(400).send(err);
            }
          );
          // if the user already exists, then just fetch all the users
        } else {
          return userModel.findAllUsers();
        }
      },
      function(err){
        res.status(400).send(err);
      }
    )
    .then(
      function(users){
        res.json(users);
      },
      function(){
        res.status(400).send(err);
      }
    )
  }

  //////////////////////

  function updateUser(req, res) {

    // var user = req.body;
    // var userId = req.params.userId;
    //
    // user.password = bcrypt.hashSync(user.password);
    //
    // userModel.updateUser(userId, user)
    // .then(
    //   function (doc) {
    //     res.json(doc);
    //   },
    //   function (err) {
    //     res.status(400).send(err);
    //   });
  }

  //////////////////////

  function deleteUser(req, res){

    var userId = req.params.userId;

    userModel
    .deleteUser(userId)
    .then(
      function(user){
        return userModel.findAllUsers();
      },
      function(err){
        res.status(400).send(err);
      })

      .then(
        function(users){
          console.log(users);
          res.json(users);
        },
        function(err){
          res.status(400).send(err);
        });
      }

      //////////////////////

      function findUserByCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        console.log("Hello");
      }

    }
