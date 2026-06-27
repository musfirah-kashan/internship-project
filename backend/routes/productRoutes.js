const express  = require("express");
const router   = express.Router();
const Product  = require("../models/Product");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// GET /api/products  — public, with search + categoryId filter
router.get("/", async (req, res) => {
  try {
    const { search, categoryId, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search)     query.name       = { $regex: search, $options: "i" };
    if (categoryId) query.categoryId = categoryId;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const data  = await Product.find(query)
      .populate("categoryId", "name slug icon")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ success: true, count: data.length, total, page: Number(page), pages: Math.ceil(total / Number(limit)), data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/featured  — public
router.get("/featured", async (req, res) => {
  try {
    const data = await Product.find({ featured: true })
      .populate("categoryId", "name")
      .select("name price image categoryId featured")
      .limit(10);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/deals  — public
router.get("/deals", async (req, res) => {
  try {
    const data = await Product.find({ dealProduct: true }).select("name discount image").limit(5);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/home-sections  — public
router.get("/home-sections", async (req, res) => {
  try {
    const homeOutdoor  = await Product.find({ homeCategory: "home-outdoor" }).select("name price image").limit(8);
    const electronics  = await Product.find({ homeCategory: "electronics" }).select("name price image").limit(8);
    res.json({ success: true, homeOutdoor, electronics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id  — public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId", "name slug");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id/related  — public
router.get("/:id/related", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Not found" });
    const data = await Product.find({ categoryId: product.categoryId, _id: { $ne: product._id } })
      .select("name price image").limit(6);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/products  — admin only
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/products/:id  — admin only
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/products/:id  — admin only
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;