const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("users", UserSchema);
