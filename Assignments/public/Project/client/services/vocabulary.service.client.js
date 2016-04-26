(function() {
  angular
  .module("Gesamt")
  .factory("VocabularyService", VocabularyService);

  function VocabularyService($rootScope, $http) {

    var model = {

      addWord  : addWord,
      getVocabByUserId : getVocabByUserId,
      removeWord : removeWord,
      updateWord : updateWord

    };

    return model;

    ///////////////////////////////

    function addWord(newWord) {
      return $http.post("/api/assignment/vocab", newWord);
    }

    ///////////////////////////////

    function getVocabByUserId(userId) {
      return $http.get("/api/assignment/vocab/user/" + userId);
    }

    ///////////////////////////////

    function removeWord(wordId) {
      return $http.delete("/api/project/myvocab/word/" + wordId);
    }

    ///////////////////////////////

    function updateWord(word) {
      return $http.put("/api/project/myvocab/word/", word);
    }

    ///////////////////////////////

  }
})();
