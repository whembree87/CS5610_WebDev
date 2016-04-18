(function(){
  angular
  .module("FormBuilderApp")
  .controller("FieldController", FieldController);

  function FieldController(FieldService, $routeParams) {

    var vm = this;
    var formId = $routeParams.formId;
    vm.cField = null;
    vm.editedField = null;
    vm.addField = addField;
    vm.deleteField = deleteField;
    vm.modalEdit = modalEdit;
    vm.editField = editField;
    vm.options =
    [
      'Single Line Text Field',
      'Multi Line Text Field',
      'Date Field',
      'Dropdown Field',
      'Checkboxes Field',
      'Radio Buttons Field'
    ];

    /////////////////////////////

    function init() {

      // formId --> formTitle
      FieldService
      .getFormByFormId(formId)
      .then(function (response) {
        var form = response.data;
        if(form != null) {
          formTitle = form.title;
          vm.formTitle = formTitle;
          console.log("Fields should be", form.fields);
          vm.fields = form.fields;
        }
      });
    }
    init();

    /////////////////////////////

    function editField(field) {
      vm.editedField = field;

      var isDropCheckOrRadio = !(vm.editedField.type === 'TEXT' || vm.editedField.type === 'TEXTAREA');

      if (isDropCheckOrRadio) {
        var optionList = [];
        var options = vm.editedField.options;
        for (var o in options) {
          optionList.push(options[o].label + ":" + options[o].value)
        }
        vm.optionText = optionList.join("\n");
      }
    }

    /////////////////////////////

    function modalEdit(field) {

      vm.editedField = field;

      var isDropCheckOrRadio = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

      var optionArray = [];

      if (isDropCheckOrRadio) {
        var options = vm.optionText.split("\n");
        for (var o in options) {
          var a = options[o].split(":");
          optionArray.push({
            label: a[0],
            value: a[1]
          });
        }
        vm.editedField.options = optionArray;
      } else {
        FieldService
        .updateField(formId, vm.editedField._id, vm.editedField)
        .then(function (response) {
          var fields = response.data;
          if(fields != null) {
            vm.fields = fields;
          }
        });
      }
    }

    /////////////////////////////

    // Field --> All Fields
    function addField(field) {
      var newField = {"label": "", "type": whichFieldType(field), "placeholder": "", "options": null};

      console.log("FormId is", formId, "Field is", newField);

      FieldService
      .createFieldForForm(formId, newField)
      .then(function (response) {
          vm.fields = response.data;
      });
    }

    // addField helper : Field Type --> Option
    function whichFieldType(fieldType) {
      for (var k in options) {
        if (options[k].key == fieldType){
          return options[k].value;
        }
      }
    }

    var options =
    [
      {key: "Single Line Text Field", value: "TEXT"},
      {key: "Multi Line Text Field", value: "TEXTAREA"},
      {key: "Date Field", value: "DATE"},
      {key: "Dropdown Field", value: "OPTIONS"},
      {key: "Checkboxes Field", value: "CHECKBOXES"},
      {key: "Radio Buttons Field", value: "RADIOS"}
    ];

    /////////////////////////////

    // Field --> All Fields
    function deleteField(field) {
      console.log(field);
      FieldService
      .deleteFieldFromForm(formId, field.fieldId)
      .then(function (response) {
          vm.fields = response.data;
      });
    }

    /////////////////////////////

  }
})();
