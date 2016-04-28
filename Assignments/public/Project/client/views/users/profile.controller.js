(function(){
  angular
  .module("Gesamt")
  .controller("ProfileController", profileController);

  function profileController($location, UserService, $scope) {

    $scope.message = null;

    var vm = this;

    vm.updateUser = updateUser;

    ////////////////////////////////

    function init(){

      var user   = UserService.getCurrentUser();
      var userId = user._id;

      UserService
      .getUserById(userId)
      .then(
        function(response) {
          vm.currentUser = response.data;
        });
      }

    return init();

    ////////////////////////////////

    function updateUser (user) {

      UserService
      .updateProfile(user._id, user)
      .then(
        function(response) {
          $scope.message = "User updated successfully";
          UserService.setCurrentUser(response.data);
        });
      }

      ////////////////////////////////

    }
  })();
