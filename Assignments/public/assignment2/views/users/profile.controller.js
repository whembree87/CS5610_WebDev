(function(){
  angular
  .module("FormBuilderApp")
  .controller("ProfileController", profileController);

  function profileController($scope, $location, UserService) {
    $scope.error = null;
    $scope.message = null;

    $scope.currentUser = UserService.getCurrentUser();
    if (!$scope.currentUser) {
      $location.url("/home");
    }

    $scope.updateUser = updateUser;

    function updateUser (user) {
      // same validation as register
      $scope.error = null;
      $scope.message = null;

      $scope.currentUser = UserService.updateUser(user);

      if (user) {
        $scope.message = "User updated successfully";
        UserService.setCurrentUser($scope.currentUser);
      } else {
        $scope.message = "Unable to update the user";
      }
    }
  }
})();
