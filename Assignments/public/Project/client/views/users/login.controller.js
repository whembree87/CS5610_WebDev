(function(){
  angular
  .module("Gesamt")
  .controller("LoginController", LoginController);

  function LoginController($location, $rootScope, $scope, UserService) {

    $scope.message = null;

    var vm = this;
    vm.login = login;

    ///////////////////////////////////

    function login(user){
      
      if(user)
      UserService
      .login(user)
      .then(
        function(response){
          $rootScope.currentUser = response.data;
          $location.url("/profile");
        },
        function(err) {
          $scope.message = "Invalid Credentials";
        }
      );
    }

    ///////////////////////////////////

  }
})();
