(function(){
  angular
  .module("FormBuilderApp")
  .controller("HeaderController", HeaderController);

  function HeaderController($location, UserService) {

    var vm = this;
    vm.logout = logout;

    ////////////////////////////////

    function init() {
      vm.$location = $location;
    }
    init();

    ////////////////////////////////

    function logout() {
      UserService.setCurrentUser(null);
      $location.url("/home");
    }

    ////////////////////////////////

  }
})();
