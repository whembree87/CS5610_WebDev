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
      function (words) {
        res.json(words);
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
      function (words) {
        res.json(words);
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
      function (words) {
        res.json(words);
      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

  function updateWord(req, res) {

    var word = req.body;
    console.log("Word to be updated is", word);

    vocabularyModel
    .findWordById(word._id)
    .then(
      function (tWord) {
        if (tWord) {
          console.log("Temp word is", tWord);
        }
        vocabularyModel
        .updateWord(word)
        .then(
          function (na) {
            vocabularyModel
            .findWordById(word._id)
            .then(
              function (doc) {
                res.json(doc);
              }
            ),
            function (err) {
              res.status(400).send(err);
            }
          },
          function (err) {
            res.status(400).send(err);
          }
        );

      },
      function (err) {
        res.status(400).send(err);
      }
    );
  }

  //////////////////////

}
