(function(){
  angular
  .module("FormBuilderApp")
  .controller("AdminController", AdminController);

  function AdminController(UserService) {

    var vm = this;
    vm.addUser = addUser;
    vm.updateUser = updateUser;
    vm.removeUser = removeUser;
    vm.selectUser = selectUser;
    vm.selectedUserIndex = -1;

    //////////////////////

    function init() {
      UserService
      .findAllUsers()
      .then(function(response){
        var users = response.data;
        if(users != null) {
          vm.users = users;
        }
      });
    }
    init();

    //////////////////////

    function addUser(newUser) {
      UserService
      .createUser(newUser)
      .then(function(response){
        var updatedUsers = response.data;
        if(updatedUsers != null) {
          vm.users = updatedUsers;
        }
      });
    }

    //////////////////////

    function updateUser(user) {
      console.log(user);
      // UserService
      // .findUserByUsername(user.username)
      // .then(function(response){
      //   var theUser = response.data;
      //   var updatedUser = {
      //     _id: theUser._id,
      //     firstName: theUser.firstName,
      //     lastName: theUser.lastName,
      //     username: user.username,
      //     password: user.password,
      //     email: theUser.email,
      //     roles: user.roles
      //   }
      //   if(theUser != null) {
      //     UserService
      //     .updateUser(theUser._id, updatedUser)
      //     .then(function(response){
      //       var users = response.data;
      //       vm.users = users;
      //     });
      //   }
      // });
    }

    //////////////////////

    function removeUser(user) {
      UserService
      .deleteUserById(user.userId)
      .then(function(response){
        var updatedUsers = response.data;
        if(updatedUsers != null) {
          vm.users = updatedUsers;
        }
      });
    }

    //////////////////////

    function selectUser(index, user) {
      console.log(user);
      vm.selectedUserIndex = index;
      vm.user = {
        username: user.username,
        password: user.password,
        _id: user._id,
        roles: user.roles,
      }
    }

    //////////////////////

  }
})();
