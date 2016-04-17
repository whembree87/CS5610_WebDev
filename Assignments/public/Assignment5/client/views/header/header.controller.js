(function(){
  angular
  .module("FormBuilderApp")
  .controller("HeaderController", HeaderController);

  function HeaderController($location, UserService, $rootScope) {

    var vm = this;
    vm.logout = logout;

    //////////////////////

    function init() {
      vm.$location = $location;
    }
    init();

    //////////////////////

    function logout()
    {
      UserService
      .logout()
      .then(
        function(response){
          $rootScope.currentUser = null;
          $location.url("/login");
        },
        function(err) {
          vm.error = err;
        }
      );
    }

    // function logout() {
    //   UserService.setCurrentUser(null);
    //   $location.url("/home");
    // }

    //////////////////////

  }
})();
