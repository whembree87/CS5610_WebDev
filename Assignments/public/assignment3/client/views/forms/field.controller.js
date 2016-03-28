(function(){
  angular
  .module("FormBuilderApp")
  .controller("FieldController", FieldController);

  function FieldController(FieldService, $routeParams) {

    var vm = this;
    var formId = $routeParams.formId;

    function init() {

    }
    init();

  }
})();
