(function(){
  angular
  .module("FormBuilderApp")
  .controller("FormsController", FormsController);

  function FormsController(FormsService, $rootScope) {

    var vm = this;
    vm.addForm = addForm;
    vm.deleteForm = deleteForm;
    vm.updateForm = updateForm;
    vm.selectForm = selectForm;
    vm.selectedFormIndex = -1;

    ////////////////////////////////

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

    ////////////////////////////////

    function addForm(formTitle) {

      var user = $rootScope.currentUser;
      var userId = user._id;

      FormsService
      .createFormForUser(userId, formTitle)
      .then(function (response) {
        var forms = response.data;
        if(forms != null) {
          vm.forms = forms;
        }
      });
    }

    ////////////////////////////////

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

    ////////////////////////////////

    function selectForm(index, form) {
       vm.selectedFormIndex = index;
       vm.form = {
         _id: form._id,
         title: form.title,
         userId: form.userId,
         fields: form.fields
       }
    }

    ////////////////////////////////

    function updateForm(form) {

      var formId = form._id;

      FormsService
      .updateFormById(formId, form)
      .then(function(response){
        var userForms = response.data;
        if(userForms != null) {
          vm.forms = userForms;
        }
      });
    }

  ////////////////////////////////

  }
})();
