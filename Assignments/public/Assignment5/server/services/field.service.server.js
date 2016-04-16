module.exports = function(app, fieldModel) {

  app.get("/api/assignment/form/:formId/field", getFieldsForForm);
  app.get("/api/assignment/form/:formId", getFormByFormId);
  // app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
  app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
  app.post("/api/assignment/form/:formId/field", createFieldForForm);
  app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

  function getFieldsForForm(req, res) {

    fieldModel.getFieldsForForm(req.params.formId)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        res.status(400).send(err);
      })
    }

  /////////////////////////////

  function getFormByFormId(req, res) {

    fieldModel.getFormByFormId(req.params.formId)
    .then(
      function (doc) {
        res.json(doc);
      },
      function (err) {
        res.status(400).send(err);
      })
    }

  /////////////////////////////

  function createFieldForForm(req, res) {
    console.log("/api/assignment/form/:formId/field", "FormId is", req.params.formId, "Field is", req.body);

    fieldModel.createFieldForForm(req.params.formId, req.body)
    .then(
      function (doc) {
        res.json(doc);
        console.log("Fields are", doc);
      },
      function (err) {
        res.status(400).send(err);
      })
    }

  /////////////////////////////

  function deleteFieldFromForm(req, res) {
    console.log("Server deleteFieldFromForm", "FormId is", req.params.formId, "FieldId is", req.params.fieldId);

    var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldFromForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    // var formId = req.params.formId;
    // var fieldId = req.params.fieldId;
    // res.json(fieldModel.deleteFieldFromForm(formId, fieldId))

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
