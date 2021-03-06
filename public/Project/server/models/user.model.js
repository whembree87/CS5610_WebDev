var q = require("q");

module.exports = function(db, mongoose) {

  var UserSchema = require('./user.schema.server.js')(mongoose);
  var UserModel = mongoose.model("Users", UserSchema);

  var api = {

    createUser            : createUser,
    findAllUsers          : findAllUsers,
    findUserById          : findUserById,
    updateUser            : updateUser,
    deleteUser            : deleteUser,
    findUserByUsername    : findUserByUsername,
    findUserByCredentials : findUserByCredentials

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

  function findUserById(userId) {

    var deferred = q.defer();

    UserModel.findById(userId, function (err, doc) {
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

  function findAllUsers() {

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

  function updateUser(user) {

    var id = user._id;
    delete user._id;

    var deferred = q.defer();

    UserModel.update({_id: id}, {$set:user}, {new: true, upsert: true}, function(err, doc) {
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
      {username: username},
      function (err, user){
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(user);
        }
      });
      return deferred.promise;
    }

    //////////////////////

    function findUserByCredentials(credentials) {

      var deferred = q.defer();

      UserModel.findOne(
        { username: credentials.username,
          password: credentials.password },
          function (err, user){
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(user);
            }
          });
          return deferred.promise;
        }

        //////////////////////

      }
