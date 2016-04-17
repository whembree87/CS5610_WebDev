(function(){
  angular
  .module("FormBuilderApp")
  .controller("ProfileController", profileController);

  function profileController(UserService, $location, $rootScope) {

    var vm = this;
    vm.updateUser = updateUser;

    /////////////////////////////

    function init(){

      vm.currentUser = UserService.getCurrentUser();

    }
    return init();

    /////////////////////////////

    function updateUser(user) {

      UserService
      .updateUser(user._id, user)
      .then(
        function(response) {
          vm.currentUser = response.data;
        });
    }

    /////////////////////////////

  }
})();
