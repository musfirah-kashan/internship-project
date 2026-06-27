const mongoose = require("mongoose");

const priceTierSchema = new mongoose.Schema({
  qty:    { type: String },
  price:  { type: String },
  active: { type: Boolean, default: false },
}, { _id: false });

const specSchema = new mongoose.Schema({
  label: { type: String },
  value: { type: String },
}, { _id: false });

const sellerSchema = new mongoose.Schema({
  name:           { type: String, default: "" },
  location:       { type: String, default: "" },
  verified:       { type: Boolean, default: false },
  shipsWorldwide: { type: Boolean, default: true },
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    // ── Core ──────────────────────────────────────────────────────────
    name:          { type: String, required: true, trim: true },
    price:         { type: Number, required: true },
    originalPrice: { type: Number },
    image:         { type: String, required: true },

    // ── Category reference (replaces plain string) ────────────────────
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // ── ProductListing fields ─────────────────────────────────────────
    rating:  { type: Number, default: 0 },   // out of 10
    reviews: { type: Number, default: 0 },
    free:    { type: Boolean, default: false },

    // ── ProductDetails fields ─────────────────────────────────────────
    stock:       { type: Number, default: 0 },
    sold:        { type: Number, default: 0 },
    description: { type: String, default: "" },
    thumbnails:  [String],
    mainImages:  [String],
    priceTiers:  [priceTierSchema],
    specs:       [specSchema],
    features:    [String],
    seller:      { type: sellerSchema, default: () => ({}) },

    // ── Home page flags ───────────────────────────────────────────────
    featured:     { type: Boolean, default: false },
    dealProduct:  { type: Boolean, default: false },
    recommended:  { type: Boolean, default: false },
    discount:     { type: String, default: "" },
    homeCategory: { type: String, default: "" }, // "home-outdoor" | "electronics"

    // ── Cart fields ───────────────────────────────────────────────────
    size:     { type: String, default: "" },
    color:    { type: String, default: "" },
    material: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);