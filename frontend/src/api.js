// src/api.js — all backend calls

// ✅ This must be your BACKEND Vercel URL + /api
const BASE = "https://internship-project-7jy3.vercel.app/api";

// ── Categories ────────────────────────────────────────────────────────────────
export const fetchCategories = async () => {
  const res  = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await res.json();
  return json.data;
};

// ── Products (with optional filters) ─────────────────────────────────────────
export const fetchProducts = async ({ search = "", categoryId = "", minPrice = "", maxPrice = "", page = 1, limit = 10 } = {}) => {
  const p = new URLSearchParams();
  if (search)     p.append("search",     search);
  if (categoryId) p.append("categoryId", categoryId);
  if (minPrice)   p.append("minPrice",   minPrice);
  if (maxPrice)   p.append("maxPrice",   maxPrice);
  p.append("page",  page);
  p.append("limit", limit);

  const res  = await fetch(`${BASE}/products?${p}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.data;
};

// ── Featured products (Home recommended section only) ─────────────────────────
export const fetchFeaturedProducts = async () => {
  const res  = await fetch(`${BASE}/products/featured`);
  if (!res.ok) throw new Error("Failed to fetch featured products");
  const json = await res.json();
  return json.data;
};

// ── Single product (ProductDetails) ──────────────────────────────────────────
export const fetchProductById = async (id) => {
  const res  = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  const json = await res.json();
  return json.data;
};

// ── Related products (ProductDetails) ────────────────────────────────────────
export const fetchRelated = async (id) => {
  const res  = await fetch(`${BASE}/products/${id}/related`);
  if (!res.ok) throw new Error("Failed to fetch related");
  const json = await res.json();
  return json.data;
};