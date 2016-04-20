(function(){
  angular
  .module("Gesamt")
  .controller("EnglishDictionaryController", EnglishDictionaryController);

  function EnglishDictionaryController($location, DictionaryService) {

    var vm = this;
    vm.searchEnglishDictionary = searchEnglishDictionary;
    vm.addGermanTranslation = addGermanTranslation;

    ///////////////////////////////

    function searchEnglishDictionary(word) {

      DictionaryService
      .translateEnglish(word)
      .then(function (response) {

        vm.data = response.data;

      });
    }

    ///////////////////////////////

    function addGermanTranslation(searchWord, translation) {
      console.log(searchWord, translation);
    }

    ///////////////////////////////


  }
})();
