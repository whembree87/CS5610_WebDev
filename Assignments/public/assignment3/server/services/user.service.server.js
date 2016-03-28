module.exports = function(app, userModel) {

  app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
  app.get("/api/assignment/user", findAll);
  app.get("/api/assignment/user/:id", findUserById);
  app.get("/api/assignment/user?username=username", findUserByUsername);
  // app.get("/api/assignment/userLogin/:username/:password", findUserByCredentials);

  // app.put("/api/assignment/user/:id", createUser);
  // app.delete("/api/assignment/user/:id", Delete);
  //

  function findUserByCredentials(req, res) {
    var cred = {
      username: req.params.username,
      password: req.params.password
    };
    console.log(cred);
    var user = userModel.findUserByCredentials(cred);
  }

  function createUser(req, res) {
    var user = req.body;
    var updatedUsers = userModel.create(user);
    res.json(updatedUsers);
  }

  function findAll(req, res) {
    var profiles = userModel.findAll();
    console.log(profiles);
    res.json(profiles);
  }

  function findUserById(req, res) {
    var userId = req.params.id;
    var theUser = userModel.findById(userId);
    res.json(theUser);
  }

  function findUserByUsername(req, res) {
    var username = req.params.username;
    var user = userModel.findUserByUsername(username);
    res.json(user);
  }

  function update(req, res) {
    var id = req.params["id"];
    var user = req.params["user"];
    var updatedUsers = userModel.update(user, id);
    res.json(updatedUsers);
  }

  function Delete(req, res){
    var id = req.params["id"];
    var updatedCourses = userModel.Delete(id);
    res.json(updatedCourses);
  }

}
