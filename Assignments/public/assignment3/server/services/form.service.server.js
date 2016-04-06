module.exports = function(app, formModel) {

  app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
  // app.get("/api/assignment/form/:formId", );
  app.delete("/api/assignment/form/:formId", deleteForm);
  app.post("/api/assignment/user/:userId/form", createFormForUser);
  // app.put("/api/assignment/form/:formId");

  function findAllFormsForUser(req, res) {
     //if(req.body = {}) {
       var theUserId = req.params.userId;
       var userForms = formModel.getFormByUserId(theUserId);
       res.json(userForms);
    //  }
    //  else {
    //    createFormForUser(req, res);
    //formModel.getFormByUserId(req.params.userId).then(function(userForms){
    //res.json(userForms);
  // });
  // }
}

  function deleteForm(req, res) {
    var formId = req.params.formId;
    var filteredForms = formModel.Delete(formId);
    res.json(filteredForms);
  }

  function createFormForUser(req, res) {
      console.log("Hello");
    // if(req.body != null) {
    //   findAllFormsForUser(req, res);
    // }
    // else {
      //var userId = req.params.userId;
      //console.log(userId);
      //var form = req.body;
      //console.log(form);
      //res.send(200);
    //}
  }

}
