(function(){
  angular
  .module("FormBuilderApp")
  .controller("FormsController", FormsController);

  function FormsController(FormsService, $rootScope) {

    var vm = this;
    vm.addForm = addForm;
    vm.deleteForm = deleteForm;
    vm.selectedFormIndex = -1;

    function init() {

      var user = $rootScope.currentUser;
      var userId = user._id;

      FormsService
      .findAllFormsForUser(userId)
      .then(function (response) {
        var forms = response.data;
        if(forms != null) {
          vm.forms = forms;
        }
      });
    }
    return init();

    function addForm(form) {

      var user = $rootScope.currentUser;
      var userId = user._id;
      console.log(userId);

      FormsService
      .createFormForUser(userId, form)
      .then(function (response) {
        var forms = response.data;
        if(forms != null) {
          vm.forms = forms;
        }
      });
    }

    function deleteForm(form) {

      var user = $rootScope.currentUser;
      var userId = user._id;
      var formId = form._id;

      FormsService
      .deleteFormById(formId)
      .then(function(response){
        var forms = response.data;
        if(forms != null) {
          FormsService
          .findAllFormsForUser(userId)
          .then(function(response){
            var userForms = response.data;
            if(userForms != null) {
              vm.forms = userForms;
            }
          });
        }
      });
    }

    function selectForm(id) {

    }

  }
})();
