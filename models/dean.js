const mongoose = require('mongoose');
const uuid = require('uuid');

const deanSchema = new mongoose.Schema({
  universityID: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true, default: uuid.v4 },
});

module.exports = mongoose.model('Dean', deanSchema);
