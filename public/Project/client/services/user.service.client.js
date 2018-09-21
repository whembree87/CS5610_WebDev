(function() {
  angular
  .module("Gesamt")
  .factory("UserService", UserService);

  function UserService($rootScope, $http, $q) {

    var model = {

      login                : login,
      logout               : logout,
      getCurrentUser       : getCurrentUser,
      setCurrentUser       : getCurrentUser,
      register             : register,
      findAllUsers         : findAllUsers,
      createUser           : createUser,
      deleteUserById       : deleteUserById,
      updateUser           : updateUser,
      updateProfile        : updateProfile,
      getUserById          : getUserById,
      getUserByCredentials : getUserByCredentials

    };

    return model;

    ///////////////////////////////

    function login(user) {

      var deferred = $q.defer();

      $http.post("/api/project/login", user)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function logout() {

      var deferred = $q.defer();

      $http.post("/api/project/logout")
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function findAllUsers() {

      var deferred = $q.defer();

      $http.get("/api/project/admin/user")
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function createUser(user){

      var deferred = $q.defer();

      $http.post("/api/assignment/admin/createuser", user)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function deleteUserById(userId) {

      var deferred = $q.defer();

      $http.delete("/api/assignment/admin/user/" + userId)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function updateUser(user){

      var deferred = $q.defer();

      $http.put("/api/assignment/admin/user", user)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function updateProfile(user) {

      console.log("updateProfile on client side");

      var deferred = $q.defer();

      $http.put("/api/assignment/user", user)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function getUserById(userId) {

      var deferred = $q.defer();

      $http.get("/api/assignment/user/" + userId)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function getCurrentUser() {
      return $rootScope.currentUser;
    }

    ///////////////////////////////

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    ///////////////////////////////

    function register(user) {

      var deferred = $q.defer();

      $http.post("/api/project/register", user)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function getUserByCredentials(user) {

      var username = user.username;
      var password = user.password;

      var deferred = $q.defer();

      $http.get("/api/project/user/credentials/" + username + "/" + password)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

  }
})();
