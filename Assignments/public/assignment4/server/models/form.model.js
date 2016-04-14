var q = require("q");

module.exports = function(db, mongoose) {

  var FormSchema = require('./form.schema.server.js')(mongoose);
  var FormModel = mongoose.model("forms", FormSchema);

  var api = {
    createNewForm: createNewForm,
    FindAll: FindAll,
    getFormByUserId: getFormByUserId,
    updateFormById: updateFormById,
    deleteFormById: deleteFormById,
    FindFormByTitle: FindFormByTitle,
    getFormByFormId: getFormByFormId
  };

  return api;

  ////////////////////////////////

  // UserId NewForm --> All Forms
  function createNewForm(userId, newForm) {
    var nForm = {
      title: newForm.title,
      userId: userId,
      fields: [],
      created: (new Date).getTime(),
      updated: (new Date).getTime()
    };

    var deferred = q.defer();

    FormModel.create(nForm, function (err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });

    return deferred.promise;
  }

  ////////////////////////////////

  function FindAll() {
  }

  ////////////////////////////////

  function getFormByUserId(userId) {
    var deferred = q.defer();

    FormModel.find({userId: userId}, function(err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });
    return deferred.promise;
  }

  ////////////////////////////////

  function updateFormById(formId, form) {

  }

  ////////////////////////////////

  function deleteFormById(id) {
    var deferred = q.defer();

    FormModel.remove({_id: id}, function (err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });

    return deferred.promise;
  }

  ////////////////////////////////

  function FindFormByTitle() {}

  ////////////////////////////////

  // formId --> form
  function getFormByFormId(formId) {
  }

  ////////////////////////////////

}
