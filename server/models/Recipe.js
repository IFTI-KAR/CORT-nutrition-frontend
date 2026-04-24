const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  prepTime: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  ingredients: [String],
  steps: [String],
  nutritionHighlight: String,
  tags: [String],
});

module.exports = mongoose.model("Recipe", recipeSchema);
