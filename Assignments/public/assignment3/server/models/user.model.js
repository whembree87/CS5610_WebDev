var mockUsers = require("./user.mock.json");

module.exports = function() {

  var api = {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
    Delete: Delete,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials
  };

  return api;

  function create(user) {
    user._id = "ID_" + (new Date()).getTime();
    mockUsers.push(user);
    return mockUsers;
  }

  function findAll() {
    return mockUsers;
  }

  function findById(id) {
    for(var u in mockUsers) {
    if(mockUsers[u]._id === id) {
        return mockUsers[u];
      }
    }
    return null;
  }

  function update(currentUser, id) {
    var user = findById(id);
    if (user != null){
      user._id = currentUser._id;
      user.firstName = currentUser.firstName;
      user.lastName = currentUser.lastName;
      user.username = currentUser.username;
      user.password = currentUser.passwords;
      return user;
    } else {
      return null;
    }
  }

  function Delete(id) {
    mockUsers.splice(id, 1);
    return mockUsers;
  }

  function findUserByUsername(username) {
    for(var u in mockUsers) {
    if(mockUsers[u].username === username) {
        return mockUsers[u];
      }
    }
    return null;
  }

  function findUserByCredentials(credentials) {
       for (var u in mockUsers) {
           if (mockUsers[u].username == credentials.username &&
               mockUsers[u].password == credentials.password) {
               return mockUsers[u];
           }
       }
       return null;
   }

  }
