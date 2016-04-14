var mockForms = require("./form.mock.json");

module.exports = function() {

  var api = {
    createNewForm: createNewForm,
    FindAll: FindAll,
    getFormByUserId: getFormByUserId,
    updateFormById: updateFormById,
    getIndex: getIndex,
    deleteFormById: deleteFormById,
    FindFormByTitle: FindFormByTitle,
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
    // for(var f in mockForms){
    //   if(mockForms[f]._id === formId){
    //     mockForms[f]._id = form._id;
    //     mockForms[f].title = form.title;
    //     mockForms[f].userId = form.userId;
    //     mockForms[f].fields = form.fields;
    //   }
    // }
  }

  // function update(currentUser, id) {
  //   var userIndex = getIndexOfUser(id);
  //   mockUsers[userIndex]._id = currentUser._id;
  //   mockUsers[userIndex].firstName = currentUser.firstName;
  //   mockUsers[userIndex].lastName = currentUser.lastName;
  //   mockUsers[userIndex].username = currentUser.username;
  //   mockUsers[userIndex].password = currentUser.password;
  //   mockUsers[userIndex].email = currentUser.email;
  //   return mockUsers;
  // }

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
    // var index = getIndex(formId);
    // console.log("Form Id is", formId);
    // console.log("Index of form is", index);
    // var filteredForms = mockForms.splice(index, 1);
    // //return filteredForms;
    // console.log("Filtered forms are", filteredForms);
  }

  // function deleteFieldFromForm(formId, fieldId) {
  //   var Forms = getFormByFormId(formId);
  //   var fields = Forms.fields;
  //
  //   for (f in fields){
  //     if (fields[f]._id === fieldId) {
  //       fields.splice(f, 1);
  //       return fields;
  //     }
  //   }
  // }

  ////////////////////////////////

  function FindFormByTitle() {}

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
