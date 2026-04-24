const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config({ path: "../.env" });

const app = express();
connectDB();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/nutrition", require("./routes/nutritionRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));
app.use("/api/varieties", require("./routes/varietyRoutes"));

app.get("/", (req, res) => res.json({ message: "🌽 Corn API running" }));
app.get("/api", (req, res) => res.json({ message: "🌽 Corn API running" }));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production" && !process.env.NETLIFY) {
  app.listen(PORT, () => console.log(`🌽 Corn API running on port ${PORT}`));
}

module.exports = app;
