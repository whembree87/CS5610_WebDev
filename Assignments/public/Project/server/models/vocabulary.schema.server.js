module.exports = function (mongoose) {

  var VocabularySchema = mongoose.Schema({

    userId  : String,

    english : String,

    german  : String

  }, {collection: 'word'});

  return VocabularySchema;

};
