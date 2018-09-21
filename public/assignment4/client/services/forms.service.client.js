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
      // var deferred = $q.defer();
      // $http.post("/api/assignment/user/" + userId + "/form", form)
      // .then(function(forms){
      //   deferred.resolve(forms);
      // }, function (forms) {
      //   deferred.reject(forms);
      // });
      // return deferred.promise;
    }

    ////////////////////////////////

    //   var deferred = $q.defer();
    //   return $http
    //   .post("/api/assignment/user/" + userId + "/form", form)
    //   .success(function (response){
    //     deferred.resolve(response);
    //   });
    //   return deferred.promise;
    // }

    function findAllFormsForUser(userId) {
      return $http.get("/api/assignment/user/" + userId + "/form");
      // var deferred = $q.defer();
      // $http.get("/api/assignment/user/" + userId + "/form")
      // .then(function(forms){
      //   deferred.resolve(forms);
      // }, function (forms) {
      //   deferred.reject(forms);
      // });
      //
      // return deferred.promise;
    }

    ////////////////////////////////

    //   var deferred = $q.defer();
    //   return $http
    //   .get("/api/assignment/user/" + userId + "/form")
    //   .success(function (response){
    //     deferred.resolve(response);
    //   });
    //   return deferred.promise;
    // }

    function deleteFormById(formId) {
      return $http.delete("/api/assignment/form/" + formId);
    }
    //   var deferred = $q.defer();
    //   $http.delete("/api/assignment/form/" + formId);
    //   .then(function(forms){
    //     deferred.resolve(forms);
    //   }, function (forms) {
    //     deferred.reject(forms);
    //   });
    //
    //   return deferred.promise;
    // }
    //   var deferred = $q.defer();
    //   return $http
    //   .delete("/api/assignment/form/" + formId)
    //   .success(function (response){
    //     deferred.resolve(response);
    //   });
    //   return deferred.promise;
    // }

    ////////////////////////////////

    function updateFormById(formId, newForm) {
      return  $http.put("/api/assignment/form/" + formId, newForm);
      // var deferred = $q.defer();
      // $http.put("/api/assignment/form/" + formId, newForm)
      // .then(function(forms){
      //   deferred.resolve(forms);
      // }, function (forms) {
      //   deferred.reject(forms);
      // });
      //
      // return deferred.promise;
    }

    ////////////////////////////////

    //   var deferred = $q.defer();
    //   return $http
    //   .put("/api/assignment/form/" + formId, newForm)
    //   .success(function (response){
    //     deferred.resolve(response);
    //   });
    //   return deferred.promise;
    // }
  }
})();
