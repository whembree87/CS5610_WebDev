module.exports = function(app, userModel) {
  app.get("/api/assignment/user", findUserByCredentials);
  app.get("/api/assignment/users", findAll);
  app.get("/api/assignment/user/:userId",  findUserById);
  app.get("/api/assignment/user?username=username", findUserByUsername);
  app.post("/api/assignment/createuser", createUser);
  app.delete("/api/assignment/user/:id", deleteUser);
  app.put("/api/assignment/user/:id", update);

  //////////////////////

  function findUserByCredentials(req, res) {

    console.log("/api/assignment/user", "findUserByCredentials");

    if(req.query.password != null) {

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
      else if (req.query.userId != null) {
        findUserById(req, res);
      }
      else findAll(req, res);
    }

    //////////////////////

    function findUserById(req, res) {
      console.log(req.params.userId);
    }

    //////////////////////

    function createUser(req, res) {

      console.log("/api/assignment/createuser", "createUser");

      var user = req.body;
      console.log(user);

      userModel.createUser(user)
      .then(
        function (doc) {
          res.json(doc);
        },
        function (err) {
          res.status(400).send(err);
        })
      }

      //////////////////////

      function findAll(req, res) {

        console.log("/api/assignment/users");

        userModel.findAll()
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          }
        );
      }

      //////////////////////

      function findUserById(req, res) {
        var userId = req.params.id;
        var theUser = userModel.findById(userId);
        res.json(theUser);
      }

      //////////////////////

      function findUserByUsername(req, res) {

        console.log("/api/assignment/user?username=username");

        userModel.findUserByUsername(req.query.username)
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          }
        );
      }
      // var username = req.query.username;
      // var userProfile = userModel.findUserByUsername(username);
      // res.jsonv(userProfile);

      //////////////////////

      function update(req, res) {
        console.log("/api/assignment/user/:id");
        var id = req.params.id;
        var user = req.body;
        console.log(user);
        var updatedUsers = userModel.update(user, id);
        console.log(updatedUsers);
        res.json(updatedUsers);
      }

      //////////////////////

      function deleteUser(req, res){

        console.log("/api/assignment/user/:id");

        userModel.deleteUser(req.params.id)
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          });
        }

        //////////////////////

      }
