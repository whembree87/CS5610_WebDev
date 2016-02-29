(function(){
  angular
  .module("FormBuilderApp")
  .controller("FormsController", FormsController);

  function FormsController($scope, FormsService) {

    // Event Handler Declarations
    $scope.addForm = addForm;
    $scope.updateForm = updateForm;
    $scope.deleteForm = deleteForm;
    $scope.selectForm = selectForm;

    // Event Handler Implementation
    function addForm(form) {
      // Create and add to list
      var newForm = {
        id: form.id,
        title: form.title,
        userId: form.userId
      };
      // Append to array
      $scope.formsModel.forms.push(newForm);
    }

    function updateForm(form) {
        $scope.formsModel.forms[$scope.selectedFormIndex].id = form.id;
  			$scope.formsModel.forms[$scope.selectedFormIndex].title = form.title;
  			$scope.formsModel.forms[$scope.selectedFormIndex].userId = form.userId;
    }

    function deleteForm(form) {
      var index = $scope.formsModel.forms.indexOf(form);
      // Remove the element at index, once.
      $scope.formsModel.forms.splice(index, 1);
    }

    var selectedFormIndex = -1;

    function selectForm(form) {
      selectedFormIndex = $scope.formsModel.forms.indexOf(form);
      $scope.form = {
        id: form.id,
        title: form.title,
        userId: form.userId
      };
    }
  }
})();
