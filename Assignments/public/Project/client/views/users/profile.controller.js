(function(){
  angular
  .module("Gesamt")
  .controller("ProfileController", profileController);

  function profileController($rootScope, $location, UserService) {

    var vm = this;
    vm.error = null;
    vm.message = null;

    vm.updateUser = updateUser;

    ////////////////////////////////

    function init(){

      vm.currentUser = UserService.getCurrentUser();
      console.log( UserService.getCurrentUser());

    }
    return init();

    ////////////////////////////////

    function updateUser (user) {

      vm.error = null;
      vm.message = null;

      vm.currentUser = UserService.updateUser(user);

      if (user) {
        vm.message = "User updated successfully";
        UserService.setCurrentUser(vm.currentUser);
      } else {
        vm.message = "Unable to update the user";
      }
    }

    ////////////////////////////////

  }
})();
