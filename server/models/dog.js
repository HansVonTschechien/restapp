const mongoose = require("mongoose");

const dogSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String, required: true },
  tail: { type: Boolean, required: true },
});

module.exports = mongoose.model("Dog", dogSchema);