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
      // var deferred = $q.defer();
      // return $http
      // .post("/api/assignment/form/" + formId + "/field", field)
      // .success(function (response){
      //   deferred.resolve(response);
      // });
      // return deferred.promise;
    }

    function getFieldsForForm(formId){
      return $http.get("/api/assignment/form/" + formId + "/field");
      // var deferred = $q.defer();
      // return $http
      // .get("/api/assignment/form/" + formId + "/field")
      // .success(function (response){
      //   deferred.resolve(response);
      // });
      // return deferred.promise;
    }

    function getFieldForForm(formId, fieldId) {
      return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
      // var deferred = $q.defer();
      // return $http
      // .get("/api/assignment/form/" + formId + "/field/" + fieldId)
      // .success(function (response){
      //   deferred.resolve(response);
      // });
      // return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
      return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
      ///api/assignment/form/:formId/field/:fieldId
      // var deferred = $q.defer();
      // return $http
      // .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
      // .success(function (response){
      //   deferred.resolve(response);
      // });
      // return deferred.promise;
    }


    function updateField(formId, fieldId, field){
      return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
      console.log(formId, fieldId, field);

      // var deferred = $q.defer();
      // return $http
      // .put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
      // .success(function (response){
      //   deferred.resolve(response);
      // });
      // return deferred.promise;
    }

    function getFormByFormId(formId) {
      return $http.get("/api/assignment/form/" + formId);
      // console.log(formId);
      // var deferred = $q.defer();
      // return $http
      // .get("/api/assignment/form/" + formId)
      // .success(function (response){
      //   deferred.resolve(response);
      // });
      // return deferred.promise;
    }

  }

})();
