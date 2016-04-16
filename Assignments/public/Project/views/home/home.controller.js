(function(){
  angular
  .module("FormBuilderApp")
  .controller("HomeController", HomeController);

  function HomeController($scope, $location) {

    $scope.$location = $location;
    $scope.transitionToDictionary = transitionToDictionary;

    function transitionToDictionary() {
      $location.url("/dictionary");
    }


}
})();
