(function() {
  angular
  .module("Gesamt")
  .factory("VocabularyService", VocabularyService);

  function VocabularyService($rootScope, $http, $q) {

    var model = {

      addWord          : addWord,
      getVocabByUserId : getVocabByUserId,
      removeWord       : removeWord,
      updateWord       : updateWord

    };

    return model;

    ///////////////////////////////

    function addWord(newWord) {

      var deferred = $q.defer();

      $http.post("/api/assignment/vocab", newWord)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function getVocabByUserId(userId) {

      var deferred = $q.defer();

      $http.get("/api/assignment/vocab/user/" + userId)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function removeWord(wordId) {

      var deferred = $q.defer();

      $http.delete("/api/project/myvocab/word/" + wordId)
      .then(function(res){
        deferred.resolve(res);
      }, function (res) {
        deferred.reject(res);
      });
      return deferred.promise;
    }

    ///////////////////////////////

    function updateWord(word) {

      var deferred = $q.defer();

      $http.put("/api/project/myvocab/word/", word)
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
