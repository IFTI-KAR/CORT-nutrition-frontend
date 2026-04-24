const mongoose = require("mongoose");
const Nutrition = require("../models/Nutrition");
const Recipe = require("../models/Recipe");
const CornVariety = require("../models/CornVariety");
require("dotenv").config({ path: "../../.env" });

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB for seeding...");

  await Nutrition.deleteMany();
  await Recipe.deleteMany();
  await CornVariety.deleteMany();

  await Nutrition.create({
    per100g: {
      calories: 86,
      carbohydrates: 19,
      protein: 3.2,
      fat: 1.2,
      fiber: 2.4,
      sugar: 3.2,
      vitaminC: 6.8,
      vitaminB1: 0.2,
      folate: 42,
      magnesium: 37,
      potassium: 270,
      phosphorus: 89,
    },
    glycemicIndex: 52,
    antioxidants: ["lutein", "zeaxanthin", "beta-carotene"],
  });

  await Recipe.insertMany([
    {
      title: "Elote (Mexican Street Corn)",
      image: "recipe-01.jpg",
      prepTime: "15 min",
      difficulty: "Easy",
      ingredients: ["4 ears corn", "mayonnaise", "cotija cheese", "chili powder", "lime"],
      steps: ["Grill corn", "Coat with mayo", "Roll in cheese", "Sprinkle chili + lime"],
      nutritionHighlight: "High in Fiber & Vitamin C",
      tags: ["Mexican", "Grilled", "Street Food"],
    },
    {
      title: "Creamy Corn Chowder",
      image: "recipe-02.jpg",
      prepTime: "35 min",
      difficulty: "Medium",
      ingredients: ["6 ears corn", "potato", "heavy cream", "onion", "thyme"],
      steps: ["Sauté onion", "Add potatoes + corn", "Pour cream", "Simmer 20 min"],
      nutritionHighlight: "Rich in Potassium & Folate",
      tags: ["Soup", "Comfort Food", "Winter"],
    },
    {
      title: "Blue Corn Tortillas",
      image: "recipe-03.jpg",
      prepTime: "20 min",
      difficulty: "Medium",
      ingredients: ["2 cups blue masa harina", "warm water", "salt"],
      steps: ["Mix masa + water", "Form balls", "Press flat", "Cook on comal 2 min each side"],
      nutritionHighlight: "Antioxidant-rich Anthocyanins",
      tags: ["Mexican", "Gluten-Free", "Traditional"],
    },
  ]);

  await CornVariety.insertMany([
    {
      name: "Yellow Sweet Corn",
      color: "#F5C842",
      origin: "United States",
      uses: ["Fresh eating", "Canning", "Freezing"],
      flavorProfile: "Sweet, juicy, tender — the classic summer corn",
      image: "corn-varieties.jpg",
    },
    {
      name: "Blue Corn",
      color: "#4A5A8A",
      origin: "Southwestern USA & Mexico",
      uses: ["Tortillas", "Chips", "Cornmeal"],
      flavorProfile: "Earthy, slightly nutty with a dense texture",
      image: "corn-closeup-01.jpg",
    },
    {
      name: "White Corn",
      color: "#F5F0E8",
      origin: "Mexico & Central America",
      uses: ["Hominy", "Masa", "Grits"],
      flavorProfile: "Mild, starchy with a subtle sweetness",
      image: "corn-closeup-02.jpg",
    },
    {
      name: "Purple Corn",
      color: "#5B2D8E",
      origin: "Peru & Andes",
      uses: ["Beverages", "Desserts", "Natural dye"],
      flavorProfile: "Bold, berry-like with deep antioxidant notes",
      image: "corn-harvest.jpg",
    },
  ]);

  console.log("✅ Seed data inserted!");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
