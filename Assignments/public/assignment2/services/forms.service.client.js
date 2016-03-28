(function()
{
  angular
  .module("FormBuilderApp")
  .factory("FormsService", FormsService);

  function FormsService() {

    var forms = [
      {"_id": "010", "title": "ToDo", "userId": 123},
      {"_id": "000", "title": "Contacts", "userId": 123},
      {"_id": "020", "title": "CDs", "userId": 234},
    ];

    var service = {
      createFormForUser : createFormForUser,
      findAllFormsForUser : findAllFormsForUser,
      deleteFormById : deleteFormById,
      updateFormById : updateFormById,
      findAllFormsById : findAllFormsById
    };

    return service;

    function createFormForUser(userId, form, callback) {
      var newForm = {
        id: form.id,
        title: form.title,
        userId: userId
      }
    }

    function findAllFormsForUser(userId, callback) {
      for (var f in forms) {
        if (forms[f].userId === userId) {
          return forms[f];
        }
      }
      return null;
    }

    function deleteFormById(formId, callback) {
      forms.splice(index, 1);
    }

    function updateFormById(formId, newForm, callback) {
      var form = forms.findAllFormsById(formId);
      if (form !=null) {
        forms.form.id = newForm.id;
        forms.form.title = newForm.title;
        forms.form.userId = newForm.userId;
        return form;
      } else {
        return null;
      }
    }

    function findAllFormsById(theUserId) {
      var theForms = [];
      for (var f in forms) {
        if (forms[f].userId === theUserId) {
          theForms.push(forms[f]);
        }
      }
      return theForms;
    }


  }
})();
