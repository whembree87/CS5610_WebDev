var q = require("q");

module.exports = function(db, mongoose) {

  var UserSchema = require('./user.schema.server.js')(mongoose);
  var UserModel = mongoose.model("Users", UserSchema);

  var api = {
    createNewUser: createNewUser,
    findAll: findAll,
    findUserById: findUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials
  };

  return api;

  //////////////////////

  // User --> All Users
  function createNewUser(newUser) {
    var deferred = q.defer();
    UserModel.create(
      newUser,
      function (err, doc){
        if (err) {
          console.log("error");
          deferred.reject(err);
        } else {
          console.log(doc);
          deferred.resolve(doc);
        }
      });
      return deferred.promise;
    }

    //////////////////////

    // --> All Users
    function findAll() {
      var deferred = q.defer();
      UserModel.find({}, function (err, users) {
        if (err) {
          deferred.reject(err);
        }
        else {
          deferred.resolve(users);
        }
      });
      return deferred.promise;
    }

    //////////////////////

    // Id --> User
    function findUserById(userId) {
      var deferred = q.defer();
      userModel.findById(userId, function (err, userFound){
        if(err){
          deferred.reject(err);
        }else{
          deferred.resolve(userFound);}
        });
        return deferred.promise;
      }

      //////////////////////

      // User Id --> All Users
      function updateUser(user, id) {
        var deferred = q.defer();
        userModel.update({_id: userId}, {$set: user}, function (err, user) {
          if (err) {
            deferred.reject(err);
          } else {
            userModel.find(function(err, users){
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(users);
              }
            });
          }
        });
        return deferred.promise;
      }

      //////////////////////

      // UserId --> Users
      function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({userId: userId},
          function (err, users) {
            if(err){
              deferred.reject(err);
            } else {
              UserModel.find(function (err, users) {
                if (err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(users);
                }
              });
            }
          });
          return deferred.promise;
        }

        //////////////////////

        // Username --> User
        function findUserByUsername(username) {
          var deferred = q.defer();
          UserModel.findOne(
            // first argument is predicate
            username,
            function (err, user){
              if (err) {
                // reject promise if error
                deferred.reject(err);
              } else {
                // resolve promise
                deferred.resolve(user);
              }
            });
            return deferred.promise;
          }

          //////////////////////

          // Credentials --> User
          function findUserByCredentials(credentials) {
            var deferred = q.defer();
            UserModel.findOne(
              // first argument is predicate
              { username: credentials.username,
                password: credentials.password },
                function (err, user){
                  if (err) {
                    // reject promise if error
                    deferred.reject(err);
                  } else {
                    // resolve promise
                    console.log(user);
                    deferred.resolve(user);
                  }
                });
                return deferred.promise;
              }
            }
