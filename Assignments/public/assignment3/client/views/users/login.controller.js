(function(){
  angular
  .module("FormBuilderApp")
  .controller("LoginController", LoginController);

  function LoginController(UserService, $location) {

    var vm = this;
    vm.login = login;

    ////////////////////////////////

    function init() {

    }
    init();

    ////////////////////////////////

    function login(user) {

      var username = user.username;
      var password = user.password;

      UserService
      .findUserByCredentials(username, password)
      .then(function(response){
        if(response.data) {
          theUser = response.data;
          UserService.setCurrentUser(theUser);
          $location.url("/profile");
        }
      });
    }
  }
})();
