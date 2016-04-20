(function(){
  angular
  .module("Gesamt")
  .controller("HeaderController", HeaderController);

  function HeaderController($rootScope, $location, UserService) {

    var vm = this;
    vm.$location = $location;

    vm.logout = logout;

    ////////////////////////////////

    function logout() {
      UserService
      .logout()
      .then(
        function(response){
          $rootScope.currentUser = null;
          $location.url("/login");
        }
      );
    }

    ////////////////////////////////
  }
})();
