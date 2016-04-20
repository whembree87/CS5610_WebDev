(function(){
  angular
  .module("Gesamt")
  .controller("GermanDictionaryController", GermanDictionaryController);

  function GermanDictionaryController($location, DictionaryService) {

    var vm = this;
    vm.searchDictionary = searchDictionary;
    vm.addEnglishTranslation = addEnglishTranslation;

    ///////////////////////////////

    function searchDictionary(word) {

      DictionaryService
      .translateGerman(word)
      .then(function (response) {

        vm.data = response.data;

      });
    }

    ///////////////////////////////

    function addEnglishTranslation(searchWord, translation) {
      console.log(searchWord, translation);
    }

    ///////////////////////////////


  }
})();
