module.exports = function(app, userModel) {

  app.get("/api/assignment/user", findUserByCredentials);
  app.get("/api/assignment/users", findAll);
  app.get("/api/assignment/user/:userId",  findUserById);
  app.get("/api/assignment/user?username=username", findUserByUsername);
  app.post("/api/assignment/createuser", createUser);
  app.delete("/api/assignment/user/:id", deleteUser);
  app.put("/api/assignment/user/:id", updateUser);

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
      else if (req.query.username !=null) {
        findUserByUsername(req, res);
      }
      else if (req.query.userId != null) {
        findUserById(req, res);
      }
      else findAll(req, res);
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

        var userId = req.params.userId;

        userModel.findUserById(userId)
        .then(
          function (doc) {
            delete doc.password
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          }
        );
      }

      //////////////////////

      function findUserByUsername(req, res) {

        console.log("/api/assignment/user?username=username", "Username is", req.query.username);

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

      //////////////////////

      function updateUser(req, res) {
        console.log("/api/assignment/user/:id", "The user is", req.body);

        userModel.updateUser(req.params.id, req.body)
        .then(
          function (doc) {
            res.json(doc);
          },
          function (err) {
            res.status(400).send(err);
          });
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
