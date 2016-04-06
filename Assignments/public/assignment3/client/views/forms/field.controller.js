(function(){
  angular
  .module("FormBuilderApp")
  .controller("FieldController", FieldController);

  function FieldController(FieldService, $routeParams) {

    var vm = this;
    var formId = $routeParams.formId;

    function init() {
      
      // formId --> formTitle
      FieldService
      .getFormByFormId(formId)
      .then(function (response) {
        var form = response.data;
        if(form != null) {
          vm.form = form;
          console.log(form);
          formTitle = form.title;
          console.log(formTitle);
          vm.formTitle = formTitle;
        }
      });

      // formId --> fields
      FieldService
      .getFieldsForForm(formId)
      .then(function (response) {
        var fields = response.data;
        if(fields != null) {
          vm.fields = fields;
        }
      });
    }
    init();

  }
})();
