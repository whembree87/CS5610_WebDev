(function() {
  angular
  .module("FormBuilderApp")
  .factory("UserService", UserService);

  function UserService($http, $rootScope, $q) {

    var api = {
      findUserByUsername: findUserByUsername,
      login: login,
      logout: logout,
      register: register,
      findAllUsers: findAllUsers,
      createUser: createUser,
      findUserById: findUserById,
      deleteUserById: deleteUserById,
      updateUser: updateUser,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };

    return api;

    //////////////////////

    function register(user) {
      return $http.post("/api/assignment/register", user);
    }

    //////////////////////

    function findUserByUsername(username) {

      return $http.get("/api/assignment/user?username=" + username);

    }

    //////////////////////

    function login(user) {
      return $http.post("/api/assignment/login", user);
    }

    //////////////////////

    function logout() {
      return $http.post("/api/assignment/logout");
    }

    //////////////////////

    function findAllUsers() {
      return $http.get("/api/assignment/admin/user");
    }

    //////////////////////

    function createUser(user){

      return $http.post("/api/assignment/admin/createuser", user);

    }

    //////////////////////

    function findUserById(userId) {

      return $http.get("/api/assignment/user/" + userId);

    }

    //////////////////////

    function deleteUserById(userId) {

      return $http.delete("/api/assignment/admin/user/" + userId);

    }

    //////////////////////

    function updateUser(userId, user){

      return $http.put("/api/assignment/admin/user/" + userId, user);

    }

    //////////////////////

    function setCurrentUser(user) {

      $rootScope.currentUser = user;

    }

    //////////////////////

    function getCurrentUser() {

      return $rootScope.currentUser;

    }

    //////////////////////

  }
})();
