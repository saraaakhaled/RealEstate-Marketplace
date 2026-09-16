const express = require("express");
const Property = require("../models/Property");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// =========================
// Image Upload
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    files: 7
  }
});

// =========================
// Create Property
// =========================

router.post(
  "/",
  protect,
  authorize("Admin", "Agent"),
  upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "images",
      maxCount: 6
    }
  ]),
  async (req, res) => {
    try {

      const mainImage =
        req.files?.image?.[0]?.filename ||
        req.body.image ||
        "";

      const additionalImages =
        req.files?.images
          ? req.files.images.map(file => file.filename)
          : [];

      const property = await Property.create({
        ...req.body,

        image: mainImage,

        images: additionalImages
      });

      res.status(201).json(property);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }
  }
);

// =========================
// Get All Properties
// =========================

router.get("/", protect, async (req, res) => {
  try {

    const properties = await Property.find();

    res.status(200).json(properties);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// =========================
// Get Property By ID
// =========================

router.get("/:id", protect, async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.status(200).json(property);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
});

// =========================
// Update Property
// =========================

router.patch(
  "/:id",
  protect,
  authorize("Admin", "Agent"),
  async (req, res) => {
    try {

      const property = await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!property) {
        return res.status(404).json({
          message: "Property not found"
        });
      }

      res.status(200).json(property);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }
  }
);

// =========================
// Delete Property
// =========================

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  async (req, res) => {
    try {

      const property = await Property.findByIdAndDelete(
        req.params.id
      );

      if (!property) {
        return res.status(404).json({
          message: "Property not found"
        });
      }

      res.status(200).json({
        message: "Property deleted successfully"
      });

    } catch (error) {

      res.status(400).json({
        message: error.message
      });

    }
  }
);

module.exports = router;