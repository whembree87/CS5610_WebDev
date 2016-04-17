(function(){
  angular
  .module("FormBuilderApp")
  .controller("RegisterController", RegisterController);

  function RegisterController(UserService, $location) {

    var vm = this;
    vm.register = register;

    //////////////////////

    function register(user) {
      if (user == null) {
        vm.error = "Please fill in the required fields";
        return;
      }
      if (!user.username) {
        vm.error = "Please provide a username";
        return;
      }
      if (!user.password || !user.password2) {
        vm.error = "Please provide a password";
        return;
      }
      if (user.password != user.password2) {
        vm.error = "Passwords must match";
        return;
      }
      else {
        UserService
        .register(user)
        .then
        (function(response){
          var currentUser = response.data;
          console.log("currentUser is", currentUser);
          if(currentUser != null) {
            UserService.setCurrentUser(currentUser);
            $location.url("/profile");
          }
          },
          function(err) {
            vm.error = "User already exists";
          }
        );
      }
    }

    //////////////////////

  }

})();
