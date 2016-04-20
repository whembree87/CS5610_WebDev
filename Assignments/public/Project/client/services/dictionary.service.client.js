(function() {
  angular
  .module("Gesamt")
  .factory("DictionaryService", DictionaryService);

  function DictionaryService($rootScope, $http) {

    var model = {

      translateGerman : translateGerman,
      translateEnglish : translateEnglish
      
    };

    return model;

    ///////////////////////////////

    function translateGerman(word) {
      return $http.jsonp("http://glosbe.com/gapi/translate?from=de&dest=eng&format=json&phrase=" + word + "&callback=JSON_CALLBACK&pretty=true");
    }

    ///////////////////////////////

    function translateEnglish(word) {
      return $http.jsonp("http://glosbe.com/gapi/translate?from=eng&dest=de&format=json&phrase=" + word + "&callback=JSON_CALLBACK&pretty=true");
    }

    ///////////////////////////////

  }
})();
