module.exports = function(app, formModel) {

  app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  // app.get("/api/assignment/form/:formId", );
  app.delete("/api/assignment/form/:formId", deleteForm);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  app.put("/api/assignment/form/:formId", updateFormById);


  function findAllFormsForUser(req, res) {
    var theUserId = req.params.userId;
    var userForms = formModel.getFormByUserId(theUserId);
    res.json(userForms);
  }

  ////////////////////////////////

  function deleteForm(req, res) {
    var formId = req.params.formId;
    res.json(formModel.deleteFormById(formId));
  }

  ////////////////////////////////

  function createFormForUser(req, res) {
    var userId = req.params.userId;
    var form = req.body;
    res.json(formModel.createNewForm(userId, form));
  }

  ////////////////////////////////

  function updateFormById(req, res) {
    var formId = req.params.formId;
    var form = req.body;
    res.json(formModel.updateFormById(formId, form));
  }

  ////////////////////////////////

}
