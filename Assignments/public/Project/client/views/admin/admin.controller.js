(function(){
  angular
  .module("Gesamt")
  .controller("AdminController", AdminController);

  function AdminController(UserService, $rootScope) {

    var vm = this;

    vm.addUser = addUser;
    vm.updateUser = updateUser;
    vm.removeUser = removeUser;
    vm.selectUser = selectUser;
    vm.selectedUserIndex = -1;

    vm.sortUsers = sortUsers;
    vm.sortByUsername = sortByUsername;
    vm.sortByFirstName = sortByFirstName;
    vm.sortByLastName = sortByLastName;
    vm.ascending = true;

    ////////////////////////////////

    function init() {

      UserService
      .findAllUsers()
      .then(function(response){

        vm.users =  response.data;

      });
    }
    init();

    ////////////////////////////////

    function addUser(newUser) {

      UserService
      .createUser(newUser)
      .then(function(response){
          vm.users = response.data;
      });
    }

    ////////////////////////////////

    function updateUser(user) {

      var userId = $rootScope.userId;

        UserService
        .updateUser(userId, user)
        .then(function(response){

          vm.users = response.data;
          
        }),

        UserService
        .findAllUsers()
        .then(function(response){

          vm.users =  response.data;

        });
    }

    ////////////////////////////////

    function removeUser(user) {

      var userId = user._id;

      UserService
      .deleteUserById(userId)
      .then(function(response){
        vm.users = response.data;
      });
    }

    ////////////////////////////////

    function selectUser(index, user) {

      vm.selectedUserIndex = index;
      $rootScope.userId = user._id;

      vm.user = {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      }
    }

    ////////////////////////////////

    function sortUsers(sortFunction) {

      vm.users.sort(sortFunction);

      vm.ascending = !vm.ascending;
    }

    ////////////////////////////////

    function sortByUsername(name1, name2) {

      var value = 0;

      if (name1.username < name2.username){
        value = -1
      }

      else if (name1.username === name2.username){
        value = 0
      }

      else {
        value = 1
      }

      if (vm.ascending){
        value = value * -1
      }

      return value;
    }

    ////////////////////////////////

    function sortByFirstName(name1, name2) {

      var value = 0;

      if (name1.firstName < name2.firstName){
        value = -1
      }

      else if (name1.firstName === name2.firstName){
        value = 0
      }

      else {
        value = 1
      }

      if(vm.ascending){
        value = value * -1
      }

      return value;
    }

    ////////////////////////////////

    function sortByLastName(name1, name2) {

      var value = 0;

      if (name1.lastName < name2.lastName){
        value = -1
      }

      else if (name1.lastName === name2.lastName){
        value = 0
      }

      else {
        value = 1
      }

      if(vm.ascending){
        value = value * -1
      }

      return value;
    }

    ////////////////////////////////

  }

})();
