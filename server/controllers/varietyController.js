const CornVariety = require("../models/CornVariety");

const getVarieties = async (req, res) => {
  try {
    const varieties = await CornVariety.find();
    res.json(varieties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVariety = async (req, res) => {
  try {
    const variety = await CornVariety.findById(req.params.id);
    if (!variety) return res.status(404).json({ message: "Variety not found" });
    res.json(variety);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getVarieties, getVariety };
