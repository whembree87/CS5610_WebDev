var q = require("q");

module.exports = function(db, mongoose, userModel) {

  var VocabularySchema = require('./vocabulary.schema.server.js')(mongoose);
  var VocabularyModel = mongoose.model("Word", VocabularySchema);

  var api = {

    addWord          : addWord,
    getVocabByUserId : getVocabByUserId,
    deleteWordById   : deleteWordById,
    updateWord       : updateWord,
    findWordById     : findWordById

  };

  return api;

  //////////////////////

  function addWord(newWord) {

    var deferred = q.defer();

    VocabularyModel.create(newWord, function(err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function getVocabByUserId(userId) {

    var deferred = q.defer();

    VocabularyModel.find({userId : userId}, function(err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function deleteWordById(id) {

    var deferred = q.defer();

    VocabularyModel.remove({_id : id}, function (err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function findWordById(id) {

    var deferred = q.defer();

    VocabularyModel.findById(id, function (err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });
    return deferred.promise;
  }

  //////////////////////

  function updateWord(word) {

    var id = word._id;
    delete word._id;

    var deferred = q.defer();

    VocabularyModel.update({_id: id}, {$set:word}, {new: true, upsert: true}, function(err, doc) {
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(doc);
      }
    });

    return deferred.promise;
  }

  //////////////////////

}
