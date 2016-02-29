(function(){
  angular
  .module("FormBuilderApp")
  .controller("LoginController", LoginController);

  function LoginController($scope, $location, $rootScope, UserService) {

    $scope.login = login;

    function login(user)
    {
      var user = UserService.findUserByUsernameAndPassword(user.username, user.password);
      if (user) {
        $rootScope.currentUser = user;
        UserService.setCurrentUser(user);
        $location.url("/profile");
      }
    }
  }
})();
