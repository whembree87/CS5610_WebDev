(function(){
  angular
  .module("Gesamt")
  .controller("SidebarController", SidebarController);

  function SidebarController($scope, $location, UserService) {
    $scope.$location = $location;
  }
})();
