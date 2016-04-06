(function() {
  angular
  .module("FormBuilderApp")
  .factory("UserService", UserService);

  function UserService($http, $rootScope, $q) {

    var api = {
      findUserByUsername: findUserByUsername,
      findUserByCredentials: findUserByCredentials,
      findAllUsers: findAllUsers,
      createUser: createUser,
      findUserById: findUserById,
      deleteUserById: deleteUserById,
      updateUser: updateUser,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };

    return api;

    function findUserByUsername(username) {
      var deferred = $q.defer();
      return $http
      .get("/api/assignment/user?username=" + username)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function findUserByCredentials(username, password) {
      var deferred = $q.defer();
      return $http
      .get("/api/assignment/user?username=" + username + "&password=" + password)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function findAllUsers() {
      var deferred = $q.defer();
      return $http
      .get("/api/assignment/users")
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function createUser(user){
      var deferred = $q.defer();
      return $http
      .post("/api/assignment/createuser", user)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function findUserById(userId) {
      var deferred = $q.defer();
      return $http
      .get("/api/assignment/user/" + userId)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function deleteUserById(userId) {
      var deferred = $q.defer();
      return $http
      .delete("/api/assignment/user/" + userId)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function updateUser(userId, user){
      var deferred = $q.defer();
      return $http
      .put("/api/assignment/user/" + userId, user)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function getCurrentUser() {
      return $rootScope.currentUser;
    }

  }
})();
