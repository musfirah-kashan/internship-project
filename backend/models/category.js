const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true, unique: true },
    slug:        { type: String, required: true, unique: true },   // "clothes-and-wear"
    icon:        { type: String, default: "" },                    // emoji or URL
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);