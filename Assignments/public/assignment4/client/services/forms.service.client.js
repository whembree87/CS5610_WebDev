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

      //////////////////////

    function createFormForUser(userId, form) {
      var deferred = $q.defer();
      return $http
      .post("/api/assignment/user/" + userId + "/form", form)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

      //////////////////////

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

  //////////////////////

    function deleteFormById(formId) {
      var deferred = $q.defer();
      return $http
      .delete("/api/assignment/form/" + formId)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

      //////////////////////

    function updateFormById(formId, newForm) {
      var deferred = $q.defer();
      return $http
      .put("/api/assignment/form/" + formId, newForm)
      .success(function (response){
        deferred.resolve(response);
      });
      return deferred.promise;
    }

      //////////////////////

  }
})();
