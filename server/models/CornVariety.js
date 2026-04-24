const mongoose = require("mongoose");

const varietySchema = new mongoose.Schema({
  name: String,
  color: String,
  origin: String,
  uses: [String],
  flavorProfile: String,
  image: String,
});

module.exports = mongoose.model("CornVariety", varietySchema);
