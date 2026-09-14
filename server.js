const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });