(function()
{
  angular
  .module("FormBuilderApp")
  .factory("FormsService", FormsService);

  function FormsService($rootScope)
  {

    var formsModel = {
      forms: [
        {id: "000", title: "Contacts", userId: 123},
        {id: "010", title: "ToDo", userId: 123},
        {id: "020", title: "CDs", userId: 234},
      ],

      createFormForUser : createFormForUser,
      findAllFormsForUser : findAllFormsForUser,
      deleteFormById : deleteFormById,
      updateFormById : updateFormById,
      findAllFormsById : findAllFormsById
    };

    return formsModel;

    function createFormForUser(userId, form, callback) {
      var newform = {
        id: form.id,
        title: form.title,
        userId: form.userId
      }
      formsModel.forms.push(newform);
      return newform;
      console.log(form);
    }

    function findAllFormsForUser(userId, callback) {
      for (var f in formsModel.forms) {
        if (formsModel.forms[f].userId == userId){
          return formsModel.forms[f];
        }
      }
      return null;
    }

    function deleteFormById(formId, callback) {
    }

    function updateFormById(formId, newForm, callback) {
      var form = formsModel.findAllFormsById(formId);
      if (form !=null) {
        form.id = newForm.id;
        form.title = newForm.title;
        form.userId = newForm.userId;
        return form;
      } else {
        return null;
      }
    }

    function findAllFormsById(formId) {
      for (var f in formsModel.forms) {
        if (formsModel.forms[f].id == id) {
          return formsModel.forms[f];
        }
      }
      return null;
    }
  }
})();
