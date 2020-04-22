const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String,
  entitlements: [{ type: Schema.Types.ObjectId, ref: "Entitlement" }],
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
