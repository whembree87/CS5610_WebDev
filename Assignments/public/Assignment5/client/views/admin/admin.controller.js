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

    ////////////////////////////////

    function init() {

      UserService
      .findAllUsers()
      .then(function(response){
          vm.users =  response.data;;
      });
    }

    init();

    ////////////////////////////////

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

    ////////////////////////////////

    function updateUser(user) {
      //console.log("updatedUser", getUser(user));
      // var currentUser = getUser(user);
      // console.log(currentUser);
      console.log("The user is", user);


      // I'm assuming usernames have to be unique, i.e., no duplicates
      UserService
      .findUserByUsername(user.username)
      .then(function(response){
        console.log("The user found is", response.data);
        console.log("Password should be", user.password);
        var theUser = response.data;
        var updatedUser = {
          _id: theUser._id,
          firstName: theUser.firstName,
          lastName: theUser.lastName,
          username: user.username,
          password: user.password,
          emails: theUser.email,
          roles: user.roles,
          phones: user.phones
        }

        UserService
        .updateUser(theUser._id, updatedUser)
        .then(function(response){
          vm.users = response.data;
        });
      });
    }

  //   FormsService
  //   .deleteFormById(formId)
  //   .then(function(response){
  //
  //     FormsService
  //     .findAllFormsForUser(response.data)
  //     .then(function(response){
  //       var userForms = response.data;
  //       if(userForms != null) {
  //         vm.forms = userForms;
  //       }
  //     });
  //   });
  // }

    // function getUser(updatedUser){
    //   var users = vm.users;
    //   for(u in users){
    //     if(users[u].username === updatedUser.username &&
    //        users[u].password === updatedUser.password){
    //          return users[u];
    //     }
    //   }
    // }

        // var theUser = response.data;
        // var updatedUser = {
          // _id: theUser._id,
          // firstName: theUser.firstName,
          // lastName: theUser.lastName,
          // username: user.username,
          // password: user.password,
          // email: theUser.email,
          // roles: user.roles
        // }
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

    ////////////////////////////////

    function removeUser(id) {

      UserService
      .deleteUserById(id)
      .then(function(response){
          vm.users = response.data;
      });
    }

    ////////////////////////////////

    function selectUser(index, user) {
      console.log("selectUser", user);
      vm.selectedUserIndex = index;
      vm.user = {
        username: user.username,
        password: user.password,
        roles: user.roles,
      }
    }

    ////////////////////////////////

  }

})();
