var q = require("q");

module.exports = function(db, mongoose) {

  var UserSchema = require('./user.schema.server.js')(mongoose);
  var UserModel = mongoose.model("Users", UserSchema);

  var api = {
    createUser: createUser,
    findAll: findAll,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
  };

  return api;

  //////////////////////

  function createUser(user) {

    var deferred = q.defer();

      UserModel.create(user, function(err, doc) {
          if (err) {
              deferred.reject(err);
          }
          else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
  }

    //////////////////////

    function findAll() {

      var deferred = q.defer();

      UserModel.find({}, function (err, doc) {
          if (err) {
              deferred.reject(err);
          }
          else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
  }

    //////////////////////

    function updateUser(userId, newUser) {

        var deferred = q.defer();

        UserModel.findByIdAndUpdate(userId, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //////////////////////

    function deleteUser(userId) {

      var deferred = q.defer();

        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //////////////////////

    function findUserByUsername(username) {
      var deferred = q.defer();
      UserModel.findOne(
        // first argument is predicate
        {username: username},
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
              deferred.resolve(user);
            }
          });
          return deferred.promise;
        }

        //////////////////////

      }
