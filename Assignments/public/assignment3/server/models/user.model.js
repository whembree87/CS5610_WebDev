var mockUsers = require("./user.mock.json");

module.exports = function() {

  var api = {
    create: create,
    findAll: findAll,
    findById: findById,
    update: update,
    Delete: Delete,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    getIndexOfUser: getIndexOfUser
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
    //return null;
  }

  // User Id --> Index
  function getIndexOfUser(id) {
    for(var u in mockUsers) {
      if(mockUsers[u]._id === id) {
        return u;
      }
    }
    //return null;
  }

  // User Id --> All Users
  function update(currentUser, id) {
    var userIndex = getIndexOfUser(id);
    mockUsers[userIndex]._id = currentUser._id;
    mockUsers[userIndex].firstName = currentUser.firstName;
    mockUsers[userIndex].lastName = currentUser.lastName;
    mockUsers[userIndex].username = currentUser.username;
    mockUsers[userIndex].password = currentUser.password;
    mockUsers[userIndex].email = currentUser.email;
    return mockUsers;
  }

  function Delete(id) {
    mockUsers.splice(id, 1);
    return mockUsers;
  }

  // Username --> User Profile
  function findUserByUsername(username) {
    for(var u in mockUsers) {
      if(mockUsers[u].username === username) {
        return mockUsers[u];
      }
    }
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
