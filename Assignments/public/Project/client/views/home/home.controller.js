(function(){
  angular
  .module("Gesamt")
  .controller("HomeController", HomeController);

  function HomeController($location) {

    var vm = this;
    vm.transitionToDictionary = transitionToDictionary;
    vm.transitionToTest = transitionToTest;

    /////////////////////////////////

    function transitionToDictionary() {
      $location.url("/germanDictionary");
    }

    /////////////////////////////////

    function transitionToTest() {
      $location.url("/germanTest");
    }

    /////////////////////////////////

  }
})();
