module.exports = function(app, userModel) {
  app.get("/api/assignment/user", findUserByCredentials);
  //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
  ///api/assignment/user?username=alice&password=wonderland
  app.get("/api/assignment/users", findAll);
  // app.get("/api/assignment/user/:id", findUserById);

  app.get("/api/assignment/user?username=username", findUserByUsername);
  // app.get("/api/assignment/userLogin/:username/:password", findUserByCredentials);

  app.post("/api/assignment/createuser", createUser);
  app.delete("/api/assignment/user/:id", Delete);
  app.put("/api/assignment/user/:id", update);

  function findUserByCredentials(req, res) {
    console.log("/api/assignment/user");

    if(req.query.password != null) {
      //console.log("password NOT null");
      //console.log(req.query.password);
      var cred = {
        username: req.query.username,
        password: req.query.password
      };
      //console.log(cred);
      var user = userModel.findUserByCredentials(cred);
      //console.log(user);
      res.json(user);
    }
    else if (req.query.username != null){
      //console.log("password null");
      findUserByUsername(req, res);
    }
  }

  function createUser(req, res) {
    console.log("/api/assignment/createuser");
    var user = req.body;
    var updatedUsers = userModel.create(user);
    res.json(updatedUsers);
  }

  function findAll(req, res) {
    console.log("/api/assignment/users");
    var profiles = userModel.findAll();
    res.json(profiles);
  }

  function findUserById(req, res) {
    var userId = req.params.id;
    var theUser = userModel.findById(userId);
    res.json(theUser);
  }

  function findUserByUsername(req, res) {
    console.log("/api/assignment/user?username=username");
    var username = req.query.username;
    var userProfile = userModel.findUserByUsername(username);
    res.jsonv(userProfile);
  }

  function update(req, res) {
    console.log("/api/assignment/user/:id");
    var id = req.params.id;
    var user = req.body;
    console.log(user);
    var updatedUsers = userModel.update(user, id);
    console.log(updatedUsers);
    res.json(updatedUsers);
  }

  function Delete(req, res){
    console.log("/api/assignment/user/:id");
    var id = req.params["id"];
    var allUsers = userModel.Delete(id);
    res.json(allUsers);
  }

}
