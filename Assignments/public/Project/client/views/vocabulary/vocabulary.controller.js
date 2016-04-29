(function(){
  angular
  .module("Gesamt")
  .controller("VocabularyController", VocabularyController);

  function VocabularyController($scope, $rootScope, VocabularyService) {

    var vm = this;

    vm.addWord    = addWord;
    vm.selectWord = selectWord;
    vm.removeWord = removeWord;
    vm.editWord   = editWord;

    vm.sortWords     = sortWords;
    vm.sortByEnglish = sortByEnglish;
    vm.sortByGerman  = sortByGerman;
    vm.ascending     = true;

    /////////////////////////////////

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

      /////////////////////////////////

      function addWord(newWord) {

        var user = $rootScope.currentUser;

        VocabularyService
        .addWord(newWord)
        .then(
          function(response) {
            vm.userWords = response.data;
          }
        ),

        VocabularyService
        .getVocabByUserId(user._id)
        .then(
          function(response) {
            vm.userWords = response.data;
          }
        );
      }

      /////////////////////////////////

      var selectedWordIndex = -1;

      function selectWord(index, word) {

        vm.selectedWordIndex = index;
        $scope.word = word;

        vm.newWord = {
          english : word.english,
          german  : word.german,
        }
      }

      /////////////////////////////////

      function removeWord(word) {

        var wordId = word._id;
        var user   = $rootScope.currentUser;

        VocabularyService
        .removeWord(wordId)
        .then(
          function(response) {
            console.log(response.data);
          }
        ),

        VocabularyService
        .getVocabByUserId(user._id)
        .then(
          function(response) {
            vm.userWords = response.data;
          }
        );
      }

      /////////////////////////////////

      function editWord(word) {

        var wordId = $scope.word._id;
        var user   = $rootScope.currentUser;

        var newWord = {
          _id     : wordId,
          english : word.english,
          german  : word.german
        }

        VocabularyService
        .updateWord(newWord)
        .then(
          function(response) {
            console.log(response.data);
          }),

          VocabularyService
          .getVocabByUserId(user._id)
          .then(
            function(response) {
              vm.userWords = response.data;
            });
          }

          /////////////////////////////////

          function sortWords(sortFunction) {

            vm.userWords.sort(sortFunction);

            vm.ascending = !vm.ascending;

          }


          /////////////////////////////////

          function sortByEnglish(word1, word2) {

            var value = 0;

            if (word1.english < word2.english){
              value = -1
            }

            else if (word1.english === word2.english){
              value = 0
            }

            else {
              value = 1
            }

            if (vm.ascending){
              value = value * -1
            }

            return value;
          }

          /////////////////////////////////

          function sortByGerman(word1, word2) {

            var value = 0;

            if (word1.german < word2.german){
              value = -1
            }

            else if (word1.german === word2.german){
              value = 0
            }

            else {
              value = 1
            }

            if(vm.ascending){
              value = value * -1
            }

            return value;
          }

          /////////////////////////////////

        }
      })();
