(function(){
  angular
  .module("Gesamt")
  .controller("HomeController", HomeController);

  function HomeController($location) {

    var vm = this;
    vm.transitionToDictionary = transitionToDictionary;

    /////////////////////////////////

    function transitionToDictionary() {
      $location.url("/germanDictionary");
    }

    /////////////////////////////////

  }
})();
