module.exports = function (mongoose) {

  var UserSchema = mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    emails: [String],
    phones: [String],
    roles: [String]
  });
return UserSchema;
};
