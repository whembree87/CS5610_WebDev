(function() {
  angular
  .module("Gesamt")
  .factory("DictionaryService", DictionaryService);

  function DictionaryService($rootScope, $http, $q) {

    var model = {

      translateGerman  : translateGerman,
      translateEnglish : translateEnglish

    };

    return model;

    ///////////////////////////////

    function translateGerman(word) {

      var deferred = $q.defer();

      $http.jsonp("http://glosbe.com/gapi/translate?from=de&dest=eng&format=json&phrase=" + word + "&callback=JSON_CALLBACK&pretty=true")
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function translateEnglish(word) {

      var deferred = $q.defer();

      $http.jsonp("http://glosbe.com/gapi/translate?from=eng&dest=de&format=json&phrase=" + word + "&callback=JSON_CALLBACK&pretty=true")
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

  }
})();
