import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, fetchRelated } from "../api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id }   = useParams();
  const { addToCart } = useCart();

  const [product,         setProduct]        = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading,         setLoading]        = useState(true);
  const [error,           setError]          = useState(null);
  const [selectedImage,   setSelectedImage]  = useState(0);
  const [activeTab,       setActiveTab]      = useState("description");

  // Fetch product
  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(setProduct)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch related products
  useEffect(() => {
    if (!id) return;
    fetchRelated(id)
      .then(setRelatedProducts)
      .catch(console.error);
  }, [id]);

  // Static "You may like" sidebar (unchanged design)
  const youMayLike = [
    { name: "Men Blazers Sets Elegant Formal",    price: "$7.00 – $69.50", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=70&h=70&fit=crop" },
    { name: "Men Short Sleeve Polo Contrast",     price: "$7.00 – $20.50", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=70&h=70&fit=crop" },
    { name: "Apple Watch Series Space Gray",      price: "$7.00 – $89.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=70&h=70&fit=crop" },
    { name: "Basketball Crew Socks Long Stuff",   price: "$7.00 – $89.50", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=70&h=70&fit=crop" },
    { name: "New Summer Men's cotton T-Shirts",   price: "$7.00 – $30.50", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=70&h=70&fit=crop" },
  ];

  if (loading) return <div style={{ textAlign: "center", padding: "60px", fontSize: "16px", color: "#888" }}>Loading product...</div>;
  if (error)   return <div style={{ textAlign: "center", padding: "60px", fontSize: "16px", color: "#fa4141" }}>{error}</div>;
  if (!product) return null;

  // Use DB images if available, else show main image
  const thumbs     = product.thumbnails?.length  ? product.thumbnails  : [product.image];
  const mainImages = product.mainImages?.length   ? product.mainImages  : [product.image];
  const tiers      = product.priceTiers?.length   ? product.priceTiers  : [{ qty: "10–150 pcs", price: `$${product.price}`, active: true }];
  const specRows   = product.specs?.length        ? product.specs        : [
    { label: "Category", value: product.categoryId?.name ?? "" },
    { label: "Price",    value: `$${product.price}` },
    { label: "Stock",    value: product.stock },
    { label: "Rating",   value: product.rating },
  ];
  const featureList = product.features?.length ? product.features : [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", fontSize: "14px", color: "#333", backgroundColor: "#fff" }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#f7f7f7", padding: "8px 40px", fontSize: "12px", color: "#888", borderBottom: "1px solid #eee" }}>
        <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
        <span style={{ margin: "0 4px" }}>&gt;</span>
        <span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/products")}>
          {product.categoryId?.name ?? "Products"}
        </span>
        <span style={{ margin: "0 4px" }}>&gt;</span>
        <span>{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px", display: "flex", gap: "24px" }}>

        {/* Left: Images */}
        <div style={{ width: "340px", flexShrink: 0 }}>
          <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", marginBottom: "10px", height: "320px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fafafa" }}>
            <img src={mainImages[selectedImage]} alt="Product" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {thumbs.map((thumb, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{ width: "54px", height: "54px", border: i === selectedImage ? "2px solid #1976d2" : "1px solid #ddd", borderRadius: "6px", overflow: "hidden", cursor: "pointer", flexShrink: 0 }}
              >
                <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Product Info */}
        <div style={{ flex: 1 }}>
          {/* Stock badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <span style={{ color: product.stock > 0 ? "#4caf50" : "#fa4141", fontSize: "12px" }}>✔</span>
            <span style={{ color: product.stock > 0 ? "#4caf50" : "#fa4141", fontSize: "12px", fontWeight: 500 }}>
              {product.stock > 0 ? "In stock" : "Out of Stock"}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#222", margin: "0 0 10px", lineHeight: 1.3 }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ color: i <= Math.round(product.rating) ? "#f5a623" : "#ddd", fontSize: "14px" }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: "12px", color: "#888" }}>{product.rating}</span>
            <span style={{ fontSize: "12px", color: "#1976d2", cursor: "pointer" }}>{product.reviews} reviews</span>
            <span style={{ fontSize: "12px", color: "#888" }}>|</span>
            <span style={{ fontSize: "12px", color: "#888" }}>{product.sold ?? 154} sold</span>
          </div>

          {/* Pricing tiers */}
          <div style={{ display: "flex", gap: "0", marginBottom: "16px", border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}>
            {tiers.map((tier, i) => (
              <div key={i} style={{
                flex: 1, padding: "10px 12px", textAlign: "center",
                backgroundColor: tier.active ? "#fff8e1" : "#fff",
                borderLeft: i > 0 ? "1px solid #eee" : "none",
              }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: tier.active ? "#e65100" : "#333" }}>{tier.price}</div>
                <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>{tier.qty}</div>
              </div>
            ))}
          </div>

          {/* Specs table */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "16px" }}>
            <tbody>
              {specRows.map(({ label, value }, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "7px 0", color: "#888", width: "130px", verticalAlign: "top" }}>{label}</td>
                  <td style={{ padding: "7px 0", color: "#333" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Seller Card */}
        <div style={{ width: "200px", flexShrink: 0 }}>
          <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "14px", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#1976d2", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "13px" }}>
                {(product.seller?.name?.[0] ?? "S").toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>Supplier</div>
                <div style={{ fontSize: "12px", color: "#555" }}>{product.seller?.name ?? "Guanje Trading LLC"}</div>
              </div>
            </div>

            <div style={{ fontSize: "12px", color: "#555", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
              🌍 {product.seller?.location ?? "Germany, Berlin"}
            </div>
            {product.seller?.verified && (
              <div style={{ fontSize: "12px", color: "#4caf50", marginBottom: "4px" }}>✔ Verified Seller</div>
            )}
            {product.seller?.shipsWorldwide && (
              <div style={{ fontSize: "12px", color: "#555", marginBottom: "14px" }}>🚚 Worldwide Shipping</div>
            )}

            <button style={{ width: "100%", padding: "9px", backgroundColor: "#1976d2", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "8px" }}>
              Send inquiry
            </button>
            <button style={{ width: "100%", padding: "9px", backgroundColor: "#fff", color: "#1976d2", border: "1px solid #1976d2", borderRadius: "6px", fontWeight: 600, fontSize: "13px", cursor: "pointer", marginBottom: "8px" }}>
              Seller's profile
            </button>
            <button style={{ width: "100%", padding: "9px", backgroundColor: "#fff", color: "#e53935", border: "1px solid #eee", borderRadius: "6px", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              ♡ Save for later
            </button>
            <button
              onClick={() => { addToCart(product); navigate("/cart"); }}
              disabled={product.stock === 0}
              style={{ width: "100%", padding: "9px", backgroundColor: product.stock === 0 ? "#ccc" : "#1976d2", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "13px", cursor: product.stock === 0 ? "not-allowed" : "pointer", marginTop: "10px" }}
            >
              {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
            </button>
          </div>

          {/* You may like */}
          <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "12px" }}>
            <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "10px", color: "#222" }}>You may like</div>
            {youMayLike.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "10px", cursor: "pointer" }}>
                <img src={item.img} alt="" style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "6px", border: "1px solid #eee", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "12px", color: "#333", lineHeight: 1.3, marginBottom: "3px" }}>{item.name}</div>
                  <div style={{ fontSize: "12px", color: "#e65100", fontWeight: 600 }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ borderBottom: "2px solid #eee", display: "flex" }}>
          {["description", "reviews", "shipping", "about seller"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: "10px 20px", border: "none", background: "none", cursor: "pointer", fontSize: "13px", fontWeight: activeTab === tab ? 600 : 400, color: activeTab === tab ? "#1976d2" : "#555", borderBottom: activeTab === tab ? "2px solid #1976d2" : "2px solid transparent", marginBottom: "-2px", textTransform: "capitalize" }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "32px", padding: "20px 0 30px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#555", lineHeight: 1.7, fontSize: "13px", marginBottom: "14px" }}>
              {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>

            {/* Specs mini table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "18px", border: "1px solid #eee" }}>
              <tbody>
                {[["Model", "#HS198867"], ["Style", "Classic style"], ["Certificate", "ISO 9001:2015"], ["Size", "34mm x 450mm x 18mm"], ["Memory", "66GB RAM"]].map(([label, value], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                    <td style={{ padding: "7px 12px", color: "#888", width: "130px", borderBottom: "1px solid #eee" }}>{label}</td>
                    <td style={{ padding: "7px 12px", color: "#333", borderBottom: "1px solid #eee" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Features */}
            {featureList.map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                <span style={{ color: "#4caf50", fontWeight: 700, marginTop: "1px" }}>✔</span>
                <span style={{ fontSize: "13px", color: "#555" }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 30px" }}>
        <h2 style={{ fontSize: "17px", fontWeight: 600, color: "#222", marginBottom: "16px" }}>Related products</h2>
        {relatedProducts.length === 0 ? (
          <p style={{ color: "#888", fontSize: "13px" }}>No related products found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
            {relatedProducts.map((p, i) => (
              <div
                key={i}
                onClick={() => navigate(`/product/${p._id}`)}
                style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "110px", objectFit: "cover" }} />
                <div style={{ padding: "8px" }}>
                  <div style={{ fontSize: "12px", color: "#333", marginBottom: "4px", lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: "12px", color: "#e65100", fontWeight: 600 }}>${p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promo Banner */}
      <div style={{ background: "linear-gradient(135deg, #1565c0 0%, #1976d2 60%, #42a5f5 100%)", margin: "0 0 30px", padding: "28px 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "20px", marginBottom: "6px" }}>Super discount on more than 100 USD</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>Have you ever finally just write dummy info</div>
        </div>
        <button
          onClick={() => navigate("/products")}
          style={{ backgroundColor: "#ff9800", color: "#fff", border: "none", borderRadius: "6px", padding: "12px 28px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
        >
          Shop now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;