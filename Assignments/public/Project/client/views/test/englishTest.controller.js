(function(){
  angular
  .module("Gesamt")
  .controller("EnglishTestController", EnglishTestController);

  function EnglishTestController($location, $rootScope, VocabularyService) {

    //////////////////////////

    var vm = this;
    vm.checkWord = checkWord;

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

        console.log(word);
      }

      //////////////////////////

    }
  })();
