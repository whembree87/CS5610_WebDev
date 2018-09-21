(function(){
  angular
  .module("FormBuilderApp")
  .controller("RegisterController", RegisterController);

  function RegisterController(UserService, $location) {

    var vm = this;

    vm.register = register;

    function init() {
    }
    init();

    function register(user) {
      if (user == null) {
        vm.message = "Please fill in the required fields";
        return;
      }
      if (!user.username) {
        vm.message = "Please provide a username";
        return;
      }
      if (!user.password || !user.password2) {
        vm.message = "Please provide a password";
        return;
      }
      if (user.password != user.password2) {
        vm.message = "Passwords must match";
        return;
      }
      console.log(user);
      UserService
      .createUser(user)
      .then(function(response){
        var currentUser = response.data;
        if(currentUser != null) {
          UserService.setCurrentUser(currentUser);
          $location.url("/profile");
        }
      });
    }

  }

})();
