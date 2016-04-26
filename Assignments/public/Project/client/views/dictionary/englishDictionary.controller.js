(function(){
  angular
  .module("Gesamt")
  .controller("EnglishDictionaryController", EnglishDictionaryController);

  function EnglishDictionaryController
  (
    $rootScope,
    $location,
    DictionaryService,
    VocabularyService
  ) {

      var vm = this;
      vm.searchEnglishDictionary = searchEnglishDictionary;
      vm.addWordToVocab = addWordToVocab;

      ///////////////////////////////

      function searchEnglishDictionary(word) {

        DictionaryService
        .translateEnglish(word)
        .then(function (response) {

          vm.data = response.data;

        });
      }

      ///////////////////////////////

      function addWordToVocab(englishWord, germanWord) {

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
