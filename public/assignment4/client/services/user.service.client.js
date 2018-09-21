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
      return $http.get("/api/assignment/user?username=" + username);
    }

    function findUserByCredentials(username, password) {
      return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
    }

    function findAllUsers() {
      return $http.get("/api/assignment/users");
    }

    function createUser(user){
      return $http.post("/api/assignment/createuser", user);
    }

    function findUserById(userId) {
      return $http.get("/api/assignment/user/" + userId);
    }

    function deleteUserById(userId) {
      return $http.delete("/api/assignment/user/" + userId);
    }

    function updateUser(userId, user){
      return $http.put("/api/assignment/user/" + userId, user);
    }

    function setCurrentUser(user) {
      $rootScope.currentUser = user;
    }

    function getCurrentUser() {
      return $rootScope.currentUser;
    }

  }
})();
