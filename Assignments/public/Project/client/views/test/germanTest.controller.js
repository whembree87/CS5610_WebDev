(function(){
  angular
  .module("Gesamt")
  .controller("GermanTestController", GermanTestController);

  function GermanTestController($rootScope, $scope, VocabularyService) {

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

        console.log(word.german);

        // vm.userWord = word.german;

        vm.userWord = word.german;
        //
        // $scope.theWord = word.german;

      }

      //////////////////////////

    }
  })();
