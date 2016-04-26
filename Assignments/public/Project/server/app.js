module.exports = function(app, db, mongoose) {

  var userModel = require("./models/user.model.js")(db, mongoose);
  var vocabularyModel = require("./models/vocabulary.model.js")(db, mongoose, userModel);

  var userService = require("./services/user.service.server.js")(app, userModel);
  var vocabularyService = require("./services/vocabulary.service.server.js")(app, vocabularyModel);

}
