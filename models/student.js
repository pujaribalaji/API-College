const mongoose = require("mongoose");
const uuid = require("uuid");

const studentSchema = new mongoose.Schema({
  universityID: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true, default: uuid.v4,index: true  },
});

module.exports = mongoose.model("Student", studentSchema);
