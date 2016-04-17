(function()
{
  angular
  .module("FormBuilderApp")
  .factory("FormsService", FormsService);

  function FormsService($http, $q) {

    var api = {
      createFormForUser : createFormForUser,
      findAllFormsForUser : findAllFormsForUser,
      deleteFormById : deleteFormById,
      updateFormById : updateFormById,
    };

    return api;

    function createFormForUser(userId, form) {
      return $http.post("/api/assignment/user/" + userId + "/form", form);
    }

    ////////////////////////////////

    function findAllFormsForUser(userId) {
      var deferred = $q.defer();
      $http.get("/api/assignment/user/" + userId + "/form")
      .then(function(forms){
        deferred.resolve(forms);
      }, function (forms) {
        deferred.reject(forms);
      });

      return deferred.promise;
    }

    ////////////////////////////////

    function deleteFormById(formId) {
      return $http.delete("/api/assignment/form/" + formId);
    }

    ////////////////////////////////

    function updateFormById(formId, newForm) {
      return  $http.put("/api/assignment/form/" + formId, newForm);
    }

    ////////////////////////////////

  }
})();
