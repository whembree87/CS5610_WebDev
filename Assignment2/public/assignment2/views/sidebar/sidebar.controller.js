(function(){
  angular
  .module("FormBuilderApp")
  .controller("SidebarController", SidebarController);

  function SidebarController($scope, $location, UserService) {
    $scope.$location = $location;
  }
})();
