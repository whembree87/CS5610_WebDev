var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel, bcrypt) {

  var auth = authorized;

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post  ("/api/project/login", passport.authenticate('local'), login);
  app.post  ("/api/project/logout", logout);
  app.post  ("/api/project/register", register);
  app.post  ("/api/assignment/admin/createuser", auth, createUser);

  app.get   ("/api/assignment/loggedin", loggedin);
  app.get   ("/api/assignment/user/:userId", findUserById);
  app.get   ("/api/project/admin/user", auth, isAdmin, findAllUsers);
  app.get   ("/api/project/user/credentials/:username/:password", getUserByCredentials);

  app.put   ("/api/assignment/admin/user", auth, isAdmin, updateUserAdmin);
  app.put   ("/api/assignment/user", updateProfile);

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

  function localStrategy(username, password, done) {

    userModel
    .findUserByUsername(username)
    .then(
      function(user) {
        if(user && bcrypt.compareSync(password, user.password)){
          return done(null, user);
        } else {
          return done(null, false);
        }
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

  //////////////////////

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

  function getUserByCredentials(req, res) {

    var credentials = {
      username : req.params.username,
      password : req.params.password
    }

    userModel
    .findUserByCredentials(credentials)
    .then(
      function (user) {
        res.json(user);
      },
      function (err) {
        res.status(400).send(err);
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

    var user = req.body;

    if(user.username == 'laura'){

      newUser = {
        username : user.username,
        password : bcrypt.hashSync(user.password),
        roles    : "admin"
      };

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

    } else {

      newUser = {
        username : user.username,
        password : bcrypt.hashSync(user.password),
        roles    : "student"
      }

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

  function updateUserAdmin(req, res) {

    var user = req.body;

    userModel
    .findUserById(user._id)
    .then(
      function (tUser) {
        if (tUser.password !== user.password) {
          user.password = bcrypt.hashSync(user.password);
        }
        userModel.updateUser(user)
        .then(
          function (na) {
            userModel
            .findUserById(user._id)
            .then(
              function (doc) {
                console.log(doc);
                res.json(doc);
              }
            ),
            function (err) {
              res.status(400).send(err);
            }
          },
          function (err) {
            res.status(400).send(err);
          }
        );

      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function findUserById(req, res) {

    var userId = req.params.userId;

    userModel.findUserById(userId)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        res.status(400).send(err);
      });
    }

    //////////////////////

    function updateProfile(req, res) {

      var user = req.body;

      console.log("updateProfile on server side with", user);

      delete user.roles;

      userModel
      .findUserById(user._id)
      .then(
        function (oUser) {
          if (oUser.password !== user.password) {
            user.password = bcrypt.hashSync(user.password);
          }
          userModel.updateUser(user)
          .then(
            function (na) {
              userModel
              .findUserById(user._id)
              .then(
                function (doc) {
                  res.json(doc);
                }
              ),
              function (err) {
                res.status(400).send(err);
              }
            },
            function (err) {
              res.status(400).send(err);
            }
          );

        },
        function (err) {
          res.status(400).send(err);
        }
      );
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

      }
