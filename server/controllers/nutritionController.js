const Nutrition = require("../models/Nutrition");

const getNutrition = async (req, res) => {
  try {
    const data = await Nutrition.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getNutrition };
