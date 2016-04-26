var q = require("q");

module.exports = function(db, mongoose, formModel) {

  var FieldSchema = require('./field.schema.server.js')(mongoose);
  var FieldModel = mongoose.model("Fields", FieldSchema);

  var api = {
    getFormByFormId: getFormByFormId,
    createFieldForForm: createFieldForForm,
    deleteFieldFromForm: deleteFieldFromForm,
    updateField: updateField,
    getFieldsForForm: getFieldsForForm
  };

  return api;

  /////////////////////////////

  // formId --> form
  function getFormByFormId(formId) {
    var form = formModel.getFormByFormId(formId);
    return form;
  }

  /////////////////////////////

  function createFieldForForm(formId, field) {
    console.log("Field model createFieldForForm", "FormdId is", formId, "Field is", field);

    var deferred = q.defer();

    FieldModel.findByIdAndUpdate(formId, {$push: {"fields": field}}, {new: true}, function (err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc)
      }
    });
    return deferred.promise;
  }

  /////////////////////////////

  function deleteFieldFromForm(formId, fieldId){

    var deferred = q.defer();

    FieldModel.findByIdAndUpdate(formId, {
      $pull: {fields:
        {_id: fieldId}
      }},
      function (err, doc) {
        if (err) {
          deferred.reject(err);
        }
        else {
          deferred.resolve(doc);
        }
      });

      return deferred.promise;
    }

    /////////////////////////////

    function updateField(formId, field) {

      var deferred = q.defer();

      FieldModel.update({_id: formId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
        if (err) {
          deferred.reject(err);
        }
        else {
          deferred.resolve(doc)
        }
      });
      return deferred.promise;
    }

    /////////////////////////////

    function getFieldsForForm(formId) {

      var deferred = q.defer();

      FieldModel.findById(formId, function (err, doc) {
        if (err) {
          deferred.reject(err);
        }
        else {
          deferred.resolve(doc);
        }
      });
      return deferred.promise;
    }

    /////////////////////////////

  }
