var mockForms = require("./form.mock.json");

module.exports = function(formModel) {

  var api = {
    getFormByFormId: getFormByFormId,
    createFieldForForm: createFieldForForm,
    deleteFieldFromForm: deleteFieldFromForm,
    updateField: updateField
  };

  return api;

  /////////////////////////////

  // formId --> form
  function getFormByFormId(formId) {
    for (var m in mockForms) {
      if (mockForms[m]._id === formId) {
        return mockForms[m];
      }
    }
  }

  /////////////////////////////

  // FormId Field --> Fields
  function createFieldForForm(formId, field) {
    var formIndex = getIndexOfForm(formId);

    mockForms[formIndex].fields.push(field);

    return mockForms[formIndex].fields;
  }

  function getIndexOfForm(formId) {
    for (var m in mockForms){
      if (mockForms[m]._id === formId){
        return m;
      }
    }
  }

  /////////////////////////////

  // FormId FieldId --> All Forms
  function deleteFieldFromForm(formId, fieldId) {
    var Forms = getFormByFormId(formId);
    var fields = Forms.fields;

    for (f in fields){
      if (fields[f]._id === fieldId) {
        fields.splice(f, 1);
        return fields;
      }
    }
  }

  /////////////////////////////

  // Helper Function : FieldId -->  Index
  function getIndexOfField(formFields, fieldId) {

    for (var f in formFields[f]){
      if(formFields[f]._id === fieldId){
        return f;
      }
    }
  }

  /////////////////////////////

  function updateField(formId, fieldId, field) {
    var Forms = getFormByFormId(formId);
    var fields = Forms.fields;

    for (f in fields){
      if (fields[f]._id === fieldId) {
        fields[f] = field;
        return fields;
      }
    }

  }


  /////////////////////////////

}
