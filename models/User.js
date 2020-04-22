const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  role: { type: Schema.Types.ObjectId, ref: "Role" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
