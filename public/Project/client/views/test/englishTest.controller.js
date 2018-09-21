(function(){
  angular
  .module("Gesamt")
  .controller("EnglishTestController", EnglishTestController);

  function EnglishTestController($location, $rootScope, VocabularyService) {

    //////////////////////////

    var vm = this;
    vm.checkWord = checkWord;
    vm.userWord = null;

    //////////////////////////

    function init() {

      var user = $rootScope.currentUser;

      VocabularyService
      .getVocabByUserId(user._id)
      .then(
        function(response) {

          vm.userWords = response.data;

        });
      }

      init();

      //////////////////////////

      function checkWord(word){

        vm.userWord = word.english;

      }

      //////////////////////////

    }
  })();
