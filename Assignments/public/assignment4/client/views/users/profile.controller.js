(function(){
  angular
  .module("FormBuilderApp")
  .controller("ProfileController", profileController);

  function profileController(UserService, $location, $rootScope) {

    var vm = this;
    vm.updateUser = updateUser;
    vm.currentUser = $rootScope.currentUser;

    function init(){
      var currentUser = UserService.getCurrentUser();
             if(currentUser == null) {
                 $location.url("/home");
             }
    }
    return init();

    function updateUser(currentUser) {
      UserService
      .updateUser(currentUser._id, currentUser);
    }

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
})();
