(function(){
  angular
  .module("Gesamt")
  .controller("GermanDictionaryController", GermanDictionaryController);

  function GermanDictionaryController
  ($rootScope,
    $location,
    DictionaryService,
    VocabularyService) {

      var vm = this;
      vm.searchDictionary = searchDictionary;
      vm.addWordToVocab = addWordToVocab;

      ///////////////////////////////

      function searchDictionary(word) {

        DictionaryService
        .translateGerman(word)
        .then(function (response) {

          vm.data = response.data;

        });
      }

      ///////////////////////////////

      function addWordToVocab(germanWord, englishWord) {

        var userId = $rootScope.currentUser._id;

        var newWord = {
          userId  : userId,
          english : englishWord,
          german  : germanWord
        }

        VocabularyService.addWord(newWord)

      }

      ///////////////////////////////

    }
  })();
