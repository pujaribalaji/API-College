const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  student: { type: String, default: null },
});

module.exports = mongoose.model("Session", sessionSchema);
