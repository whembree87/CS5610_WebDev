module.exports = function(app, fieldModel) {

  app.get("/api/assignment/form/:formId/field", getFieldsForForm);
  app.get("/api/assignment/form/:formId", getFormByFormId);
  // app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
  app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
  //api/assignment/form/:formId/field/:fieldId
  app.post("/api/assignment/form/:formId/field", createFieldForForm);
  app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

  function getFieldsForForm(req, res) {
    var formId = req.params.formId;
    var theForm = fieldModel.getFormByFormId(formId);
    res.json(theForm.fields);
  }

  /////////////////////////////

  function getFormByFormId(req, res) {
    //console.log("Hello");
    var formId = req.params.formId;
    res.json(fieldModel.getFormByFormId(formId));
  }

  /////////////////////////////

  function createFieldForForm(req, res) {
    console.log("/api/assignment/form/:formId/field");
    var formId = req.params.formId;
    var field = req.body;
    updatedFields = fieldModel.createFieldForForm(formId, field);
    res.json(updatedFields);
  }

  /////////////////////////////

  function deleteFieldFromForm(req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    res.json(fieldModel.deleteFieldFromForm(formId, fieldId));
  }

  /////////////////////////////

  function updateField(req, res) {
    var formId = req.params.formId;
    var fieldId = req.params.fieldId;
    var field = req.body;
    console.log(formId, fieldId, field);
    res.json(fieldModel.updateField(formId, fieldId, field));
  }

    /////////////////////////////


}
