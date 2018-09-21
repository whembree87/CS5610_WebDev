(function(){
  angular
  .module("Gesamt")
  .controller("RegisterController", RegisterController);

  function RegisterController($location, $scope, UserService, $rootScope) {

    $scope.message = null;

    var vm = this;
    vm.register = register;

    ////////////////////////////////

    function register(user) {

      if (user == null) {
        $scope.message = "Please fill in the required fields";
        return;
      }

      if (!user.username) {
        $scope.message = "Please provide a username";
        return;
      }

      if (!user.password || !user.password2) {
        $scope.message = "Please provide a password";
        return;
      }

      if (user.password != user.password2) {
        $scope.message = "Passwords must match";
        return;

      } else {

        UserService
        .register(user)
        .then
        (function(response){

          var currentUser = response.data;

          if(currentUser != null) {
            $rootScope.currentUser = user;
            $location.url("/profile");
          } else {
            $scope.message = "User already exists";
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }

  ////////////////////////////////

}
})();
