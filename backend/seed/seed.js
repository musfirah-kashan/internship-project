const mongoose = require("mongoose");
const dotenv   = require("dotenv");
dotenv.config({ path: "../.env" });

const Category = require("../models/Category");
const Product  = require("../models/Product");

// ── Step 1: Define categories ────────────────────────────────────────────────
const categoryData = [
  { name: "Automobiles",        slug: "automobiles",         icon: "🚗", description: "Cars, bikes and vehicle accessories" },
  { name: "Clothes and wear",   slug: "clothes-and-wear",    icon: "👗", description: "Fashion for men, women and kids" },
  { name: "Home interiors",     slug: "home-interiors",      icon: "🛋️", description: "Furniture, decor and home accessories" },
  { name: "Computer and tech",  slug: "computer-and-tech",   icon: "💻", description: "Computers, peripherals and tech gear" },
  { name: "Tools, equipments",  slug: "tools-equipments",    icon: "🔧", description: "Hand tools and power equipment" },
  { name: "Sports and outdoor", slug: "sports-and-outdoor",  icon: "⚽", description: "Sports gear and outdoor equipment" },
  { name: "Animal and pets",    slug: "animal-and-pets",     icon: "🐾", description: "Pet food, toys and accessories" },
  { name: "Machinery tools",    slug: "machinery-tools",     icon: "⚙️", description: "Industrial machinery and tools" },
  { name: "Cameras",            slug: "cameras",             icon: "📷", description: "Action cams, DSLRs and accessories" },
  { name: "Electronics",        slug: "electronics",         icon: "🔌", description: "Gadgets, headphones and electronics" },
  { name: "Watches",            slug: "watches",             icon: "⌚", description: "Smart watches and luxury timepieces" },
  { name: "Phones",             slug: "phones",              icon: "📱", description: "Smartphones and mobile accessories" },
  { name: "Accessories",        slug: "accessories",         icon: "👜", description: "Bags, wallets and fashion accessories" },
  { name: "Laptops",            slug: "laptops",             icon: "💻", description: "Notebooks and ultrabooks" },
];

// ── Step 2: Build products using inserted category IDs ───────────────────────
const buildProducts = (catMap) => [
  // ── DEAL PRODUCTS ────────────────────────────────────────────────────────
  {
    name: "Smart watches", price: 79.99, originalPrice: 109.99,
    image: "https://picsum.photos/seed/dealwatch/120/120",
    categoryId: catMap["watches"],
    rating: 7.5, reviews: 200, free: true,
    discount: "-25%", dealProduct: true, featured: false, recommended: true,
    homeCategory: "electronics",
    stock: 50, sold: 320,
    description: "Premium smart watch with fitness tracking and heart rate monitoring.",
    thumbnails: ["https://picsum.photos/seed/dealwatch/80/80"],
    mainImages: ["https://picsum.photos/seed/dealwatch/400/400"],
    priceTiers: [
      { qty: "10–150 pcs",  price: "$79.99", active: false },
      { qty: "150–700 pcs", price: "$72.00", active: false },
      { qty: "700+ pcs",    price: "$65.00", active: true },
    ],
    specs: [
      { label: "Price",         value: "Negotiable" },
      { label: "Type",          value: "Smart watch" },
      { label: "Material",      value: "Aluminum, Silicone" },
      { label: "Design",        value: "Modern sleek" },
      { label: "Customization", value: "Custom logos available" },
      { label: "Protection",    value: "Refund Policy" },
      { label: "Warranty",      value: "1 year full warranty" },
    ],
    features: ["Heart rate monitoring", "GPS tracking", "Water resistant 50m", "7-day battery life"],
    seller: { name: "WatchWorld LLC", location: "Switzerland, Geneva", verified: true, shipsWorldwide: true },
    size: "42mm", color: "Silver", material: "Aluminum",
  },
  {
    name: "Laptops", price: 849.99, originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    categoryId: catMap["laptops"],
    rating: 8.0, reviews: 180, free: true,
    discount: "-15%", dealProduct: true, featured: true, recommended: true,
    homeCategory: "electronics",
    stock: 20, sold: 150,
    description: "High performance laptop for work and gaming with Intel Core i7.",
    thumbnails: ["https://picsum.photos/seed/deallaptop/80/80"],
    mainImages: ["https://picsum.photos/seed/deallaptop/400/400"],
    priceTiers: [
      { qty: "1–10 pcs",  price: "$849.99", active: false },
      { qty: "10–50 pcs", price: "$800.00", active: true },
      { qty: "50+ pcs",   price: "$750.00", active: false },
    ],
    specs: [
      { label: "Processor", value: "Intel Core i7" },
      { label: "RAM",       value: "16GB DDR5" },
      { label: "Storage",   value: "512GB SSD" },
      { label: "Display",   value: "15.6 inch FHD" },
      { label: "Warranty",  value: "2 years" },
    ],
    features: ["Backlit keyboard", "Fingerprint reader", "Fast charging", "Thunderbolt 4"],
    seller: { name: "TechWorld LLC", location: "USA, New York", verified: true, shipsWorldwide: true },
    size: "15.6 inch", color: "Silver", material: "Aluminum",
  },
  {
    name: "GoPro cameras", price: 299.99, originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    categoryId: catMap["cameras"],
    rating: 9.0, reviews: 310, free: true,
    discount: "-40%", dealProduct: true, featured: true, recommended: true,
    homeCategory: "electronics",
    stock: 35, sold: 420,
    description: "4K action camera waterproof with advanced image stabilization.",
    thumbnails: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=80&h=80&fit=crop",
    ],
    mainImages: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    ],
    priceTiers: [
      { qty: "10–150 pcs",  price: "$299.99", active: false },
      { qty: "150–700 pcs", price: "$270.00", active: false },
      { qty: "700+ pcs",    price: "$240.00", active: true },
    ],
    specs: [
      { label: "Resolution",    value: "4K 60fps" },
      { label: "Waterproof",    value: "Up to 10m" },
      { label: "Stabilization", value: "HyperSmooth 4.0" },
      { label: "Warranty",      value: "1 year" },
    ],
    features: ["4K video", "Waterproof housing", "Voice control", "Live streaming"],
    seller: { name: "CamShop GmbH", location: "Germany, Munich", verified: true, shipsWorldwide: true },
    size: "Standard", color: "Black", material: "Polycarbonate",
  },
  {
    name: "Headphones", price: 74.99, originalPrice: 99.99,
     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    categoryId: catMap["electronics"],
    rating: 7.8, reviews: 95, free: false,
    discount: "-25%", dealProduct: true, featured: true, recommended: true,
    homeCategory: "electronics",
    stock: 60, sold: 200,
    description: "Wireless noise-cancelling headphones with 30hr battery.",
    thumbnails: ["https://picsum.photos/seed/dealheadphones/80/80"],
    mainImages: ["https://picsum.photos/seed/dealheadphones/400/400"],
    priceTiers: [
      { qty: "10–150 pcs",  price: "$74.99", active: true },
      { qty: "150–700 pcs", price: "$65.00", active: false },
      { qty: "700+ pcs",    price: "$55.00", active: false },
    ],
    specs: [
      { label: "Type",         value: "Over-ear" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Battery",      value: "30 hours" },
      { label: "Warranty",     value: "1 year" },
    ],
    features: ["Active noise cancellation", "Foldable design", "Quick charge", "Hi-Res Audio"],
    seller: { name: "SoundPro Ltd", location: "Japan, Tokyo", verified: true, shipsWorldwide: true },
    size: "One size", color: "Black", material: "Plastic",
  },
  {
    name: "Canon cameras", price: 599.99, originalPrice: 799.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    categoryId: catMap["cameras"],
    rating: 8.5, reviews: 145, free: true,
    discount: "-25%", dealProduct: true, featured: true, recommended: false,
    homeCategory: "electronics",
    stock: 15, sold: 88,
    description: "Canon EOS DSLR with 24MP sensor and 10x optical zoom.",
    thumbnails: ["https://picsum.photos/seed/dealcanon/80/80"],
    mainImages: ["https://picsum.photos/seed/dealcanon/400/400"],
    priceTiers: [
      { qty: "1–5 pcs",  price: "$599.99", active: true },
      { qty: "5–20 pcs", price: "$550.00", active: false },
      { qty: "20+ pcs",  price: "$499.00", active: false },
    ],
    specs: [
      { label: "Megapixels", value: "24.2 MP" },
      { label: "Zoom",       value: "10x Optical" },
      { label: "Video",      value: "4K UHD" },
      { label: "Warranty",   value: "2 years" },
    ],
    features: ["Dual Pixel CMOS AF", "Built-in WiFi", "Weather sealed", "Touch LCD"],
    seller: { name: "CanonShop", location: "Japan, Osaka", verified: true, shipsWorldwide: true },
    size: "Standard", color: "Black", material: "Magnesium Alloy",
  },

  // ── HOME-OUTDOOR ──────────────────────────────────────────────────────────
  {
    name: "Soft chairs", price: 19, originalPrice: 35,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
    categoryId: catMap["home-interiors"],
    rating: 6.5, reviews: 40, free: false,
    dealProduct: false, featured: false, recommended: false, homeCategory: "home-outdoor",
    stock: 30, sold: 55, description: "Comfortable soft chair for living room.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "HomeFurnish Co", location: "Italy, Milan", verified: false, shipsWorldwide: true },
    size: "Standard", color: "Beige", material: "Fabric",
  },
  {
    name: "Sofa & chair", price: 19, originalPrice: 45,
    image: "https://loremflickr.com/200/200/tablelamp?lock=102",
    categoryId: catMap["home-interiors"],
    rating: 7.0, reviews: 60, free: false,
    dealProduct: false, featured: false, recommended: false, homeCategory: "home-outdoor",
    stock: 20, sold: 33, description: "Modern sofa and chair set.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "SofaWorld", location: "Denmark, Copenhagen", verified: true, shipsWorldwide: false },
    size: "Large", color: "Gray", material: "Velvet",
  },
  {
    name: "Kitchen dishes", price: 19, originalPrice: 29,
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500",
    categoryId: catMap["home-interiors"],
    rating: 6.0, reviews: 28, free: false,
    dealProduct: false, featured: false, recommended: false, homeCategory: "home-outdoor",
    stock: 80, sold: 120, description: "Premium ceramic kitchen dish set.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "KitchenPlus", location: "France, Lyon", verified: false, shipsWorldwide: true },
    size: "Set of 6", color: "White", material: "Ceramic",
  },
  {
    name: "Kitchen mixer", price: 100, originalPrice: 149,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500",
    categoryId: catMap["home-interiors"],
    rating: 8.0, reviews: 90, free: true,
    dealProduct: false, featured: false, recommended: false, homeCategory: "home-outdoor",
    stock: 25, sold: 75, description: "Stand mixer for professional baking.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "KitchenPro", location: "Germany, Berlin", verified: true, shipsWorldwide: true },
    size: "5L bowl", color: "Red", material: "Stainless Steel",
  },
  {
    name: "Blenders", price: 39, originalPrice: 59,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500",
    categoryId: catMap["home-interiors"],
    rating: 7.2, reviews: 55, free: false,
    dealProduct: false, featured: false, recommended: false, homeCategory: "home-outdoor",
    stock: 40, sold: 90, description: "High-speed blender for smoothies and soups.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "BlendPro", location: "USA, Chicago", verified: true, shipsWorldwide: true },
    size: "1.5L", color: "White", material: "Plastic",
  },
  {
    name: "Coffee maker", price: 10, originalPrice: 18,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    categoryId: catMap["home-interiors"],
    rating: 6.8, reviews: 33, free: false,
    dealProduct: false, featured: false, recommended: false, homeCategory: "home-outdoor",
    stock: 60, sold: 44, description: "Compact drip coffee maker for home use.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "BrewMate", location: "Italy, Turin", verified: false, shipsWorldwide: true },
    size: "4-cup", color: "Black", material: "Plastic",
  },

  // ── CLOTHING + CART ITEMS ─────────────────────────────────────────────────
  {
    name: "T-shirts with multiple colors, for men and lady",
    price: 78.99, originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    categoryId: catMap["clothes-and-wear"],
    rating: 7.5, reviews: 154, free: false,
    dealProduct: false, featured: false, recommended: true, homeCategory: "",
    stock: 100, sold: 900,
    description: "Premium quality t-shirt available in multiple colors. Comfortable fit for everyday wear.",
    thumbnails: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&h=80&fit=crop",
    ],
    mainImages: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    ],
    priceTiers: [
      { qty: "10–150 pcs",  price: "$98.00", active: false },
      { qty: "150–700 pcs", price: "$90.00", active: false },
      { qty: "700+ pcs",    price: "$78.00", active: true },
    ],
    specs: [
      { label: "Price",         value: "Negotiable" },
      { label: "Type",          value: "Classic style" },
      { label: "Material",      value: "Plastic material" },
      { label: "Design",        value: "Modern nice" },
      { label: "Customization", value: "Customized logos and design custom packages" },
      { label: "Protection",    value: "Refund Policy" },
      { label: "Warranty",      value: "2 years full warranty" },
    ],
    features: [
      "Some great feature name here",
      "Lorem ipsum dolor sit amet, consectetur",
      "Duis aute irure dolor in reprehenderit",
      "Some great feature name here",
    ],
    seller: { name: "Artel Market", location: "Germany, Berlin", verified: true, shipsWorldwide: true },
    size: "medium", color: "blue", material: "Plastic",
  },

  // ── PRODUCT LISTING ITEMS ─────────────────────────────────────────────────
  {
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.00, originalPrice: 1128.00,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    categoryId: catMap["cameras"],
    rating: 7.5, reviews: 154, free: true,
    dealProduct: false, featured: true, recommended: true, homeCategory: "electronics",
    stock: 25, sold: 310,
    description: "The best 4K action camera for extreme sports and adventures.",
    thumbnails: [], mainImages: [],
    priceTiers: [
      { qty: "10–150 pcs",  price: "$998.00",  active: false },
      { qty: "150–700 pcs", price: "$900.00",  active: false },
      { qty: "700+ pcs",    price: "$780.00",  active: true },
    ],
    specs: [
      { label: "Video",    value: "4K 60fps" },
      { label: "Warranty", value: "1 year" },
    ],
    features: ["4K video", "Waterproof", "Voice control"],
    seller: { name: "Guanje Trading LLC", location: "Germany, Berlin", verified: true, shipsWorldwide: true },
    size: "Standard", color: "Black", material: "Polycarbonate",
  },
  {
    name: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.00, originalPrice: 1128.00,
    image: "https://picsum.photos/seed/canon1/200/200",
    categoryId: catMap["cameras"],
    rating: 7.5, reviews: 154, free: true,
    dealProduct: false, featured: true, recommended: true, homeCategory: "electronics",
    stock: 12, sold: 88,
    description: "Canon EOS 2000 DSLR with 10x optical zoom and 24MP sensor.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "CanonOfficial", location: "Japan, Tokyo", verified: true, shipsWorldwide: true },
    size: "Standard", color: "Black", material: "Polycarbonate",
  },
  {
    name: "Smart Watch Silver",
    price: 99.50, originalPrice: 128.00,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500",
    categoryId: catMap["watches"],
    rating: 7.5, reviews: 154, free: false,
    dealProduct: false, featured: true, recommended: true, homeCategory: "electronics",
    stock: 40, sold: 200,
    description: "Elegant silver smart watch with health tracking features.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "WatchWorld", location: "Switzerland, Geneva", verified: true, shipsWorldwide: true },
    size: "40mm", color: "Silver", material: "Stainless Steel",
  },
  {
    name: "Smartphone Blue",
    price: 99.50, originalPrice: 128.00,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    categoryId: catMap["phones"],
    rating: 5.9, reviews: 154, free: false,
    dealProduct: false, featured: false, recommended: true, homeCategory: "electronics",
    stock: 55, sold: 430,
    description: "Mid-range Android smartphone with 6.5 inch display.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "PhoneHub", location: "China, Shenzhen", verified: false, shipsWorldwide: true },
    size: "Standard", color: "Blue", material: "Glass/Aluminum",
  },
  {
    name: "Leather wallet",
    price: 99.00, originalPrice: 129.00,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    categoryId: catMap["accessories"],
    rating: 8.2, reviews: 75, free: false,
    dealProduct: false, featured: false, recommended: true, homeCategory: "",
    stock: 70, sold: 180,
    description: "Genuine leather bifold wallet with RFID protection.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "LeatherCraft", location: "Italy, Florence", verified: true, shipsWorldwide: true },
    size: "Standard", color: "Brown", material: "Genuine Leather",
  },
  {
    name: "Jeans shorts for men blue color",
    price: 10.30, originalPrice: 18.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    categoryId: catMap["clothes-and-wear"],
    rating: 6.5, reviews: 42, free: false,
    dealProduct: false, featured: false, recommended: true, homeCategory: "",
    stock: 80, sold: 110,
    description: "Comfortable blue denim shorts for men, available in multiple sizes.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "DenimCo", location: "USA, Los Angeles", verified: true, shipsWorldwide: true },
    size: "medium", color: "blue", material: "Denim",
  },
  {
    name: "Brown winter coat medium size",
    price: 12.50, originalPrice: 22.00,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    categoryId: catMap["clothes-and-wear"],
    rating: 7.8, reviews: 63, free: false,
    dealProduct: false, featured: false, recommended: true, homeCategory: "",
    stock: 35, sold: 67,
    description: "Warm winter coat in brown color with fleece lining.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "CoatFactory", location: "Turkey, Istanbul", verified: true, shipsWorldwide: true },
    size: "medium", color: "brown", material: "Wool",
  },
  {
    name: "Laptop Pro",
    price: 99.50, originalPrice: 128.00,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    categoryId: catMap["laptops"],
    rating: 7.5, reviews: 154, free: false,
    dealProduct: false, featured: true, recommended: false, homeCategory: "electronics",
    stock: 18, sold: 95,
    description: "Powerful laptop with fast SSD and brilliant display.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "LaptopHub", location: "Taiwan, Taipei", verified: true, shipsWorldwide: true },
    size: "14 inch", color: "Space Gray", material: "Aluminum",
  },
  {
    name: "Headphones Wireless",
    price: 99.50, originalPrice: 128.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    categoryId: catMap["electronics"],
    rating: 7.5, reviews: 154, free: false,
    dealProduct: false, featured: true, recommended: false, homeCategory: "electronics",
    stock: 45, sold: 230,
    description: "Wireless over-ear headphones with deep bass and noise cancellation.",
    thumbnails: [], mainImages: [], priceTiers: [], specs: [], features: [],
    seller: { name: "AudioTech", location: "South Korea, Seoul", verified: true, shipsWorldwide: true },
    size: "One size", color: "Black", material: "Plastic",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
    console.log("✅ MongoDB connected");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("🗑️  Cleared products and categories");

    // Insert categories
    const insertedCategories = await Category.insertMany(categoryData);
    console.log(`📂 Seeded ${insertedCategories.length} categories`);

    // Build a slug → ObjectId map for easy product assignment
    const catMap = {};
    insertedCategories.forEach(cat => {
      catMap[cat.slug] = cat._id;
    });

    // Insert products
    const products = buildProducts(catMap);
    await Product.insertMany(products);
    console.log(`🌱 Seeded ${products.length} products`);

    mongoose.connection.close();
    console.log("✅ Done! Database is ready.");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seedDB();