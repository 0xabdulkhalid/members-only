const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 20 },
  lastName: { type: String, required: true, maxLength: 20 },
  mail: { type: String, required: true, maxLength: 50 },
  password: { type: String, required: true, maxLength: 25 },
  isMember: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
