const express = require("express");
const router = express.Router();
const { getVarieties, getVariety } = require("../controllers/varietyController");

router.get("/", getVarieties);
router.get("/:id", getVariety);

module.exports = router;
