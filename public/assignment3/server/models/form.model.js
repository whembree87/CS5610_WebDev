var mockForms = require("./form.mock.json");

module.exports = function() {

  var api = {
    createNewForm: createNewForm,
    FindAll: FindAll,
    getFormByUserId: getFormByUserId,
    updateFormById: updateFormById,
    getIndex: getIndex,
    deleteFormById: deleteFormById,
    getFormByFormId: getFormByFormId
  };

  return api;

  ////////////////////////////////

  // UserId NewForm --> All Forms
  function createNewForm(userId, newForm) {
    var newId = (new Date).getTime();
    var id = newId.toString();
    var newForm = {
      _id: id,
      title: newForm.title,
      userId: userId,
      fields: []
    };
    mockForms.push(newForm);
    return getFormByUserId(userId);
  }

  ////////////////////////////////

  function FindAll() {
    return mockForms;
  }

  ////////////////////////////////

  // userId --> forms
  function getFormByUserId(userId) {
    var theForms = [];
    for (var m in mockForms) {
      if (mockForms[m].userId === userId) {
        theForms.push(mockForms[m]);
      }
    }
    return theForms;
  }

  ////////////////////////////////

  function updateFormById(formId, form) {
    for (var f in mockForms) {
      if (mockForms[f]._id === formId) {
        mockForms[f] = form;
      }
    }
    return getFormByUserId(form.userId);
  }

  ////////////////////////////////

  // formId --> index
  function getIndex(formId) {
    for (var i = 0; i < mockForms.length; i++) {
      if (mockForms[i]._id === formId) {
        return i;
      }
    }
  }

  ////////////////////////////////

  function deleteFormById(formId) {
    for(var m in mockForms){
      if(mockForms[m]._id === formId){
        mockForms.splice(m, 1);
      }
    }
  }

  ////////////////////////////////

  // formId --> form
  function getFormByFormId(formId) {
    for (var m in mockForms) {
      if (mockForms[m]._id === formId) {
        return mockForms[m];
      }
    }
  }

  ////////////////////////////////

}
