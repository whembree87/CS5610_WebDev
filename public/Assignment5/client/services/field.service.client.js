(function()
{
  angular
  .module("FormBuilderApp")
  .factory("FieldService", FieldService);

  function FieldService($http, $q) {

    var api = {
      createFieldForForm: createFieldForForm,
      getFieldsForForm: getFieldsForForm,
      getFieldForForm: getFieldForForm,
      deleteFieldFromForm: deleteFieldFromForm,
      updateField: updateField,
      getFormByFormId: getFormByFormId
    };

    return api;

    function createFieldForForm(formId, field){
      console.log("Client createFieldForForm", "FormdId is", formId, "Field is", field);
      return $http.post("/api/assignment/form/" + formId + "/field", field);
    }

    function getFieldsForForm(formId){
      return $http.get("/api/assignment/form/" + formId + "/field");
    }

    function getFieldForForm(formId, fieldId) {
      return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
    }

    function deleteFieldFromForm(formId, fieldId) {
      return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
    }


    function updateField(formId, fieldId, field){
      return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
      console.log(formId, fieldId, field);
    }

    function getFormByFormId(formId) {
      return $http.get("/api/assignment/form/" + formId);
    }

  }

})();
