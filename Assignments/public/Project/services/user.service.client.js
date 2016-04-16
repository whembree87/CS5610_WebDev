(function() {
  angular
  .module("FormBuilderApp")
  .factory("UserService", UserService);

  function UserService($rootScope) {

    var model = {

      users: [
        {"id": 123, "firstName": "Alice", "lastName": "Wonderland", "username": "alice", "password": "alice", "roles": ["admin"]},
        {"id": 234, "firstName": "Bob", "lastName": "Hope", "username": "bob", "password": "bob", "roles": ["admin"]},
        {"id": 345, "firstName": "Charlie", "lastName": "Brown", "username": "charlie", "password":"charlie", "roles": ["user"]},
        {"id": 456, "firstName": "Dan", "lastName": "Craig", "username": "dan", "password":"dan", "roles": ["admin"]},
        {"id": 567, "firstName": "Edward", "lastName": "Norton", "username": "ed", "password":"ed", "roles": ["user"]}
      ],

      createUser: createUser,
      findUserByUsernameAndPassword: findUserByUsernameAndPassword,
      updateUser: updateUser,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      deleteUserById: deleteUserById
    };

    return model;

    function createUser(user, callback) {
      var user = {
        username: user.username,
        password: user.password,
      };
      model.users.push(user);
      return user;
    }

    function findUserByUsernameAndPassword (username, password, callback) {
      for (var u in model.users) {
        if (model.users[u].username === username &&
          model.users[u].password === password) {
            return model.users[u];
          }
        }
        return null;
      }

      function updateUser (currentUser) {
        var user = model.findUserByUsernameAndPassword (currentUser.username, currentUser.password);
        if (user != null) {
          user.firstName = currentUser.firstName;
          user.lastName = currentUser.lastName;
          user.password = currentUser.password;
          return user;
        } else {
          return null;
        }
      }

      function setCurrentUser (user) {
        $rootScope.currentUser = user;
      }

      function getCurrentUser () {
        return $rootScope.currentUser;
      }

      function deleteUserById(userId, user, callback) {
        for (var u in model.users) {
          if (model.users.userId === userId) {
            model.users.splice(user, 1);
          }
        }
        return null;
      }
    }
  })();
