var mockForms = require("./form.mock.json");

module.exports = function() {

  var api = {
    Create: Create,
    FindAll: FindAll,
    FindById: FindById,
    update: update,
    getIndex: getIndex,
    Delete: Delete,
    FindFormByTitle: FindFormByTitle,
    getFormByFormId: getFormByFormId
  };

  return api;

  function Create(form) {
    mockForms.push(form);
    var userId = form.userId;
    var filteredUserForms = FindById(userId);
    return filteredUserForms;
  }

  function FindAll() {}

  function FindById(userId) {
    var theForms = [];
    for (var m in mockForms) {
      if (mockForms[m].userId === userId) {
        theForms.push(mockForms[m]);
      }
    }
    return theForms;
  }

  function update() {}

  // formId --> index
  function getIndex(formId) {
    for (var i = 0; i < mockForms.length; i++) {
        if (mockForms[i]._id === formId) {
            return i;
        }
    }
}

  function Delete(formId) {
    var index = getIndex(formId);
    var filteredForms = mockForms.splice(index, 1);
    return filteredForms;
  }

  function FindFormByTitle() {}

  // formId --> form
  function getFormByFormId(formId) {
    for (var m in mockForms) {
      if (mockForms[m]._id === formId) {
        return mockForms[m];
      }
    }
  }

}
