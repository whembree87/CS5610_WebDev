(function() {
  angular
  .module("Gesamt")
  .factory("UserService", UserService);

  function UserService($rootScope, $http) {

    var model = {

      login : login,
      logout : logout,
      getCurrentUser : getCurrentUser,
      setCurrentUser : getCurrentUser,
      register : register,
      findAllUsers : findAllUsers,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser

    };

    return model;

    ///////////////////////////////

    function login(user) {
      return $http.post("/api/project/login", user);
    }

    ///////////////////////////////

    function logout() {
      return $http.post("/api/project/logout");
    }

    ///////////////////////////////

    function findAllUsers() {
      return $http.get("/api/project/admin/user");
    }

    ///////////////////////////////

    function createUser(user){
      return $http.post("/api/assignment/admin/createuser", user);
    }

    ///////////////////////////////

    function deleteUserById(userId) {
      return $http.delete("/api/assignment/admin/user/" + userId);
    }

    ///////////////////////////////

    function updateUser(userId, user){
      return $http.put("/api/assignment/admin/user/" + userId, user);
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
      return $http.post("/api/project/register", user);
    }

    ///////////////////////////////

  }
})();
