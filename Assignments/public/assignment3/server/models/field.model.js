var mockForms = require("./form.mock.json");

module.exports = function() {

  var api = {
    getFormByFormId: getFormByFormId
  };

  return api;

  // formId --> form
  function getFormByFormId(formId) {
    for (var m in mockForms) {
      if (mockForms[m]._id === formId) {
        return mockForms[m];
      }
    }
  }

}
