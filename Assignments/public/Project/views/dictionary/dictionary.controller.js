(function(){
  angular
  .module("FormBuilderApp")
  .controller("DictionaryController", DictionaryController);

  function DictionaryController($scope, $location) {

    // Dictionary
    var searchUrl = "https://glosbe.com/gapi/translate?from=de&dest=eng&format=json&phrase=WORD&pretty=true"

    // Rendering
    $scope.$location = $location;

    // Event Handler Declarations
    $scope.searchDictionary = searchDictionary;

    // Event Handler Implementations
    function searchDictionary(word) {
      console.log("Searching dictionary", word);
      var url = searchUrl.replace("WORD", word);
      // Fetch data
      $.ajax({
        url: url,
        success: renderSearchResults,
        error: console.log("ajax error")
      });
    }

    function renderSearchResults(response) {
     $scope.data = response;
      console.log(response);
    }

  }
})();
