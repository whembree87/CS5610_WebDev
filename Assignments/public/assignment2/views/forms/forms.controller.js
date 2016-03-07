(function(){
  angular
  .module("FormBuilderApp")
  .controller("FormsController", FormsController);

  function FormsController($scope, FormsService, UserService) {

    var user = UserService.getCurrentUser();
    var userForms = [FormsService.findAllFormsForUser(user._id)];
    $scope.userForms = userForms;

    // Event Handler Declarations
    $scope.addForm = addForm;
    $scope.updateForm = updateForm;
    $scope.deleteForm = deleteForm;
    $scope.selectForm = selectForm;

    // Event Handler Implementation
    function addForm(form) {
      var userForm = {
        _id: form.id,
        title: form.title,
        userId: form.userId
      }
      $scope.userForms.push(userForm);
    }

    function updateForm(form) {
      $scope.userForms[$scope.selectedFormIndex]._id = form.id;
      $scope.userForms[$scope.selectedFormIndex].title = form.title;
      $scope.userForms[$scope.selectedFormIndex].userId = form.userId;
    }

    function deleteForm(index) {
      $scope.userForms.splice(index, 1);
    }

    var selectedFormIndex = -1;

    function selectForm(index) {
      $scope.selectedFormIndex = index;
      $scope.newForm = {
        id: $scope.userForms[index]._id,
        title: $scope.userForms[index].title,
        userId: $scope.userForms[index].userId
      };
    }

  }
})();
