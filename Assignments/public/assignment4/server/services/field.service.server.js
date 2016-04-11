module.exports = function(app, fieldModel) {

  app.get("/api/assignment/form/:formId/field", getFieldsForForm);
  app.get("/api/assignment/form/:formId", getFormByFormId);
  app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
  app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
  app.post("/api/assignment/form/:formId/field", createFieldForForm);
  app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

  function getFieldsForForm(req, res) {
    var formId = req.params.formId;
    var field = req.body;
    fieldModel.addFormField(formId, field)
    .then(function (updatedFields) {
      if (updatedFields) {
        res.json(updatedFields);
      } else {
        res.send(404);
      }
    });
  }

  //////////////////////

  function getFormByFormId(req, res) {
    //console.log("Hello");
    var formId = req.params.formId;
    res.json(fieldModel.getFormByFormId(formId));
  }

  //////////////////////

  function getFieldForForm(req, res) {}

  //////////////////////

  function deleteFieldFromForm(req, res) {}

  //////////////////////

  function createFieldForForm(req, res) {}

  //////////////////////

  function updateField (req, res) {}

}
