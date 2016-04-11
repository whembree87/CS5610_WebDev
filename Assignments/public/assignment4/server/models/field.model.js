module.exports = function(db, mongoose) {

  // var FieldSchema = require('./field.schema.server.js')(mongoose);
  // var FieldModel = mongoose.model("Fields", FieldSchema);

  var api = {
    getFormByFormId: getFormByFormId
  };

  return api;

  // formId --> form
  function getFormByFormId(formId) {
  }

}
