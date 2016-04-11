module.exports = function(app, userModel) {

  app.get("/api/assignment/user", findUserByCredentials);
  app.get("/api/assignment/users", findAll);
  app.get("/api/assignment/user?username=username", findUserByUsername);
  app.post("/api/assignment/createuser", createUser);
  app.delete("/api/assignment/user/:id", deleteUser);
  app.put("/api/assignment/user/:id", updateUser);

  //////////////////////

  function findUserByCredentials(req, res) {
    console.log("/api/assignment/user", "findUserByCredentials");
    var cred = {
      username: req.query.username,
      password: req.query.password
    };
    userModel.findUserByCredentials(cred)
    .then(
      function (user) {
        res.json(user);
      },
      function (err) {
        res.status(400).send(err);
      });
    }

    //////////////////////

    function createUser(req, res) {
      console.log("/api/assignment/createuser", "createUser");
      var user = req.body;
      userModel.createNewUser(user)
      .then(
        function(users){
          res.json(users);
        },
        function(err){
          res.status(400).send(err);
        });
      }

      //////////////////////

      function findAll(req, res) {
        console.log("/api/assignment/users", "findAll");
        //res.json(userModel.findAll());
        userModel.findAll()
        .then(
          function(users) {
            res.json(users);
          },
          function(err) {
            res.status(400).send(err);
          });
        }

        //////////////////////

        function findUserByUsername(req, res) {
          console.log("/api/assignment/user?username=username", "findUserByUsername");
          var username = req.query.username;
          userModel.findUserByUsername(username)
          .then(
            function (user) {
              res.json(user);
            },
            function (err) {
              res.status(400).send(err);
            });
          }

        //////////////////////

        function updateUser(req, res) {
          console.log("/api/assignment/user/:id", "updateUser");
          var id = req.params.id;
          var user = req.body;
          userModel.updateUser(user, id)
          .then(
            function (user) {
              res.json(user);
            },
            function (err) {
              res.status(400).send(err);
            });
          }

        //////////////////////

        function deleteUser(req, res){
          console.log("/api/assignment/user/:id", "deleteUser");
          var userId = req.params.id;
          userModel.deleteUser(userId)
          .then(
            function(users){
              res.json(users);
            },
            function(err){
              res.status(400).send(err);
            });
          }

          //////////////////////

        }
