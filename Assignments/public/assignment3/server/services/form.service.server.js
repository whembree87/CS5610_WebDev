module.exports = function(app, formModel) {

  app.get("/api/assignment/user/:userId/form", findForms);
  // app.get("/api/assignment/form/:formId", );
  app.delete("/api/assignment/form/:formId", deleteForm);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  // app.put("/api/assignment/form/:formId");

  function findForms(req, res) {
    var userId = req.params.userId;
    var theForms = formModel.FindById(userId);
    res.json(theForms);
  }

  function deleteForm(req, res) {
    var formId = req.params.formId;
    var filteredForms = formModel.Delete(formId);
    res.json(filteredForms);
  }

  function createFormForUser(req, res) {
    var form = req.body;
    console.log(form);
    res.send(200);
  }

}
