module.exports = function(app, db, mongoose) {

  var userModel = require("./models/user.model.js")(db, mongoose);

  var userService = require("./services/user.service.server.js")(app, userModel);


}
