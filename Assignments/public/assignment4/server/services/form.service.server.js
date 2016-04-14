module.exports = function(app, formModel) {

  app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  // app.get("/api/assignment/form/:formId", );
  app.delete("/api/assignment/form/:formId", deleteForm);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  app.put("/api/assignment/form/:formId", updateFormById);


  function findAllFormsForUser(req, res) {

    formModel.getFormByUserId(req.params.userId)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  ////////////////////////////////

  function deleteForm(req, res) {

    formModel.deleteFormById(req.params.formId)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  ////////////////////////////////

  function createFormForUser(req, res) {

    formModel.createNewForm(req.params.userId, req.body)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  ////////////////////////////////

  function updateFormById(req, res) {
    var formId = req.params.formId;
    var form = req.body;
    res.json(formModel.updateFormById(formId, form));
  }

  ////////////////////////////////

}
