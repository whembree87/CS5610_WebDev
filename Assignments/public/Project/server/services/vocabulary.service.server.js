module.exports = function(app, vocabularyModel) {

  app.post   ("/api/assignment/vocab", addWord);

  app.get    ("/api/assignment/vocab/user/:userId", getVocabByUserId);

  app.delete ("/api/project/myvocab/word/:wordId", deleteWordById);

  app.put    ("/api/project/myvocab/word", updateWord);

  //////////////////////

  function addWord(req, res) {

    var translation = req.body;
    var user = req.user;

    var newWord = {
      userId  : user._id,
      english : translation.english,
      german  : translation.german
    }

    vocabularyModel.addWord(newWord)
    .then(
      function (users) {
        res.json(users);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function getVocabByUserId(req, res) {

    var userId = req.params.userId;

    vocabularyModel.getVocabByUserId(userId)
    .then(
      function (users) {
        res.json(users);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function deleteWordById(req, res) {

    var wordId = req.params.wordId;

    vocabularyModel.deleteWordById(wordId)
    .then(
      function (users) {
        res.json(users);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function updateWord(req, res) {

    var word = req.body;

    vocabularyModel.updateWord(word)
    .then(
      function (users) {
        res.json(users);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }


  //////////////////////

}
