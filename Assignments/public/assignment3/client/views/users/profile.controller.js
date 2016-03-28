(function(){
  angular
  .module("FormBuilderApp")
  .controller("ProfileController", profileController);

  function profileController(UserService, $location) {
    var vm = this;
    vm.updateUser = updateUser;

    function init(){

      var currentUser = UserService.getCurrentUser();
             if(currentUser == null) {
                 $location.url("/home");
             }
    }
    return init();

    function updateUser(currentUser) {}

  }
})();
