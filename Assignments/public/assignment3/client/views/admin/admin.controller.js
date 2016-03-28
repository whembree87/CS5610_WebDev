(function(){
  angular
  .module("FormBuilderApp")
  .controller("AdminController", AdminController);

  function AdminController(UserService) {

    var vm = this;
    vm.addUser = addUser;
    vm.removeUser = removeUser;
    vm.selectUser = selectUser;
    vm.selectedUserIndex = -1;

    function init() {

      UserService
      .findAllUsers()
      .then(function(response){
        var users = response.data;
        if(users != null) {
          console.log(users);
          vm.users = users;
        }
      });

    }
    init();

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

    function removeUser(id) {

      UserService
      .deleteUserById(id)
      .then(function(response){
        var updatedUsers = response.data;
        if(updatedUsers != null) {
          vm.users = updatedUsers;
        }
      });
    }

    function selectUser(id) {
      vm.selectedUserIndex = id;
    }


  }

})();
