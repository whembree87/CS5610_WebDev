(function(){
  angular
  .module("FormBuilderApp")
  .controller("AdminController", AdminController);

  function AdminController(UserService, $scope, $location, $rootScope) {

    $scope.$location = $location;
    users = UserService.users;
    $scope.users = users;
    var currentUser = $rootScope.currentUser;

    // Event Handler Declarations
    $scope.removeUser = removeUser;
    $scope.addUser = addUser;
    $scope.selectUser = selectUser;
    $scope.updateUser = updateUser;

    // Event Handler Implementation
    function removeUser(index) {
      $scope.users.splice(index, 1);
    }

    function addUser(user) {

      var newUser = {
        username: user.username,
        password: user.password,
        roles: user.roles
      }
      $scope.users.push(newUser);
    }

    function updateUser(user) {
      UserService.updateUser(user);
      // var updatedUser = {
      //   _id: currentUser._id,
      //   firstName: currentUser.firstName,
      //   lastName: currentUser.lastName,
      //   username: user.username,
      //   password: user.password,
      //   email: currentUser.email,
      //   roles: user.roles
      // }
      // $scope.users.push(updatedUser);
    }

    // function updateUser(user) {
    //
    //   UserService
    //   .findUserByUsername(user.username)
    //   .then(function(response){
    //     var theUser = response.data;
    //     var updatedUser = {
    //       _id: theUser._id,
    //       firstName: theUser.firstName,
    //       lastName: theUser.lastName,
    //       username: user.username,
    //       password: user.password,
    //       email: theUser.email,
    //       roles: user.roles
    //     }
    //     if(theUser != null) {
    //       UserService
    //       .updateUser(theUser._id, updatedUser)
    //       .then(function(response){
    //         var users = response.data;
    //         vm.users = users;
    //       });
    //     }
    //   });
    // }

    var selectedUserIndex = -1;

    function selectUser(index) {
      $scope.selectedUserIndex = index;
      $scope.user = {
        username: $scope.users[index].username,
        password: $scope.users[index].password,
        roles: $scope.users[index].roles
      };
    }

  }
})();
