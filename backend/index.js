const express        = require("express");
const dotenv         = require("dotenv");
const cors           = require("cors");
const connectDB      = require("./config/db");
const productRoutes  = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes     = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

// ── CORS — allow your frontend Vercel URL + localhost ──────────────────────
app.use(cors({
  origin: [
    "https://internship-project-tan-eight.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth",       authRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/categories", categoryRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "✅ Ecommerce API running" }));

// ── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));