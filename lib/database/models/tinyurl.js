const mongoose = require("mongoose");

const tinyUrlSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  tinyUrl: {
    type: String,
    required: true,
  },
});

const TinyUrl = mongoose.model("TinyUrl", tinyUrlSchema);

module.exports = TinyUrl;
