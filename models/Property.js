const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "House", "Office", "Land", "Chalet"],
      required: true,
    },

    listingType: {
      type: String,
      enum: ["Sale", "Rent"],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    area: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
  type: String,
  default: "",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);