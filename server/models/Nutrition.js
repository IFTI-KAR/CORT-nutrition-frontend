const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  per100g: {
    calories: Number,
    carbohydrates: Number,
    protein: Number,
    fat: Number,
    fiber: Number,
    sugar: Number,
    vitaminC: Number,
    vitaminB1: Number,
    folate: Number,
    magnesium: Number,
    potassium: Number,
    phosphorus: Number,
  },
  glycemicIndex: Number,
  antioxidants: [String],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Nutrition", nutritionSchema);
