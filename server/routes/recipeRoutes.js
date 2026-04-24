const express = require("express");
const router = express.Router();
const { getRecipes, getRecipe } = require("../controllers/recipeController");

router.get("/", getRecipes);
router.get("/:id", getRecipe);

module.exports = router;
