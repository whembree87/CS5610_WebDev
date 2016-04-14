module.exports = function(app, formModel) {

  app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  app.delete("/api/assignment/form/:formId", deleteFormById);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  app.put("/api/assignment/form/:formId", updateFormById);

  //////////////////////

  function findAllFormsForUser(req, res) {
    console.log("/api/assignment/user/:userId/form", "findAllFormsForUser");
    var userId = req.params.userId;
    console.log(userId);
    formModel.getFormsByUserId(userId)
    .then(
      function(forms){
        res.json(forms);
        console.log(forms);
      },
      function(err){
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function deleteFormById(req, res) {
    console.log("/api/assignment/form/:formId", "deleteForm");
    var formId = req.params.formId;
    formModel.deleteFormById(userId)
    .then(
      function(forms){
        res.json(forms);
      },
      function(err){
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function createFormForUser(req, res) {
    console.log("/api/assignment/user/:userId/form", "createFormForUser");
    var userId = req.params.userId;
    var form = req.body;
    formModel.createFormForUser(userId, form)
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

  function updateFormById(req, res) {
    var id = req.params.formId;
    var form = req.body;
    formModel.updateFormById(id, form)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        status(400).send(err);
      }
    );
  }

}
