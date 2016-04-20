(function(){
  angular
  .module("Gesamt")
  .controller("VocabularyController", VocabularyController);

  function VocabularyController($scope, $rootScope, UserService) {

    var vm = this;

    vm.selectWord = selectWord;

    /////////////////////////////////

    function init() {

      var user = $rootScope.currentUser;

      vm.userWords = user.vocabulary;

    }
    init();

    /////////////////////////////////

    // // Get the user's vocabulary list
    // var theUser = UserService.getCurrentUser();
    // var theUserId = theUser.id;
    // var userWords = findAllFormsById(theUserId);
    //
    // function findAllFormsById(theUserId) {
    //   var wordsList = [];
    //   for (var w in words) {
    //     if (words[w].userId === theUserId) {
    //       wordsList.push(words[w]);
    //     }
    //   }
    //   return wordsList;
    // }
    //
    // $scope.userWords = userWords;
    //
    // // Event Handler Declarations
    // $scope.addWord = addWord;
    // $scope.editWord = editWord;
    // $scope.deleteWord = deleteWord;
    // $scope.selectWord = selectWord;
    //
    // // Event Handler Implementation
    // function addWord(word) {
    //   var userWord = {
    //     english: word.english,
    //     german: word.german
    //   }
    //   $scope.userWords.push(userWord);
    // }
    //
    // function editWord(word) {
    //   $scope.userWords[$scope.selectedFormIndex].english = word.english;
    //   $scope.userWords[$scope.selectedFormIndex].german = word.german;
    // }
    //
    // function deleteWord(index) {
    //   $scope.userWords.splice(index, 1);
    // }
    //
    var selectedWordIndex = -1;

    function selectWord(index) {
      $scope.selectedWordIndex = index;
      $scope.newWord = {
        english: $scope.userWords[index].english,
        german: $scope.userWords[index].german,
      };
    }

  }
})();
