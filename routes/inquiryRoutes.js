const express = require("express");
const Inquiry = require("../models/Inquiry");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Create a new inquiry
router.post("/", protect, async (req, res) => {
  try {
    const { property, message } = req.body;

    if (!property || !message) {
      return res.status(400).json({
        message: "Property and message are required"
      });
    }

    const inquiry = await Inquiry.create({
      property,
      user: req.user.userId,
      message
    });

    res.status(201).json(inquiry);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// Get current user's inquiries
router.get("/my", protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({
      user: req.user.userId
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json(inquiries);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;