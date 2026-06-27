import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const savedItems = [
  {
    id: 1,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=140&fit=crop",
  },
  {
    id: 2,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=140&fit=crop",
  },
  {
    id: 3,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=200&h=140&fit=crop",
  },
  {
    id: 4,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    img: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=200&h=140&fit=crop",
  },
];

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQty,
    clearCart,
    cartTotal
  } = useCart();

  const [coupon, setCoupon] = useState("");

  const TAX_RATE = 0.01;
  const DISCOUNT = cartTotal > 100 ? 80 : 0;
  const tax = parseFloat((cartTotal * TAX_RATE).toFixed(2));
  const total = cartTotal - DISCOUNT + tax;
  if (cartItems.length === 0) {
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">My cart (0)</h2>

        <div className="cart-empty">
          <p>Your cart is empty.</p>

          <Link to="/products" className="btn-go-shop">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">My cart ({cartItems.length})</h2>

        <div className="cart-layout">
          {/* LEFT: Cart Items */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-title">{item.name}</p>
                  <p className="cart-item-meta">
                  Category: {item.category}
                  </p>
                  <div className="cart-item-actions">
                   <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item._id)}
                    >
                    Remove
                    </button>
                    <button className="btn-save">Save for later</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="cart-item-qty">
                    <label>Qty: </label>
                    <select
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item._id, Number(e.target.value))
                    }>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-bottom-row">
            <Link to="/products" className="btn-back-shop">← Back to shop</Link>
             <button
              className="btn-remove-all"
              onClick={clearCart}>
              Remove all
              </button>
            </div>

            {/* Trust badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="trust-icon">🔒</span>
                <div>
                  <p className="trust-title">Secure payment</p>
                  <p className="trust-sub">Have you ever finally just</p>
                </div>
              </div>
              <div className="trust-badge">
                <span className="trust-icon">🎧</span>
                <div>
                  <p className="trust-title">Customer support</p>
                  <p className="trust-sub">Have you ever finally just</p>
                </div>
              </div>
              <div className="trust-badge">
                <span className="trust-icon">🚚</span>
                <div>
                  <p className="trust-title">Free delivery</p>
                  <p className="trust-sub">Have you ever finally just</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="cart-summary">
            <div className="coupon-box">
              <p className="coupon-label">Have a coupon?</p>
              <div className="coupon-input-row">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="coupon-input"
                />
                <button className="btn-apply">Apply</button>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row discount">
                <span>Discount:</span>
                <span>-${DISCOUNT.toFixed(2)}</span>
              </div>
              <div className="summary-row tax">
                <span>Tax:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total:</span>
              <span className="total-price">${total.toFixed(2)}</span>
            </div>

            <button className="btn-checkout">Checkout</button>

            {/* Payment icons using SVG inline to avoid broken external images */}
            <div className="payment-icons">
              {/* Mastercard */}
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#f0f0f0"/>
                <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
                <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00"/>
              </svg>
              {/* Visa */}
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#f0f0f0"/>
                <text x="6" y="16" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="#1A1F71">VISA</text>
              </svg>
              {/* PayPal */}
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#f0f0f0"/>
                <text x="4" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#003087">Pay</text>
                <text x="18" y="16" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#009cde">Pal</text>
              </svg>
              {/* Apple Pay */}
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="24" rx="4" fill="#000"/>
                <text x="4" y="16" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="#fff">Apple Pay</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Saved for later */}
        <div className="saved-later-section">
          <h3 className="saved-title">Saved for later</h3>
          <div className="saved-grid">
            {savedItems.map((item) => (
              <div className="saved-card" key={item.id}>
                <img src={item.image} alt={item.name} className="saved-img" />
                <p className="saved-price">${item.price.toFixed(2)}</p>
                <p className="saved-name">{item.name}</p>
                <button className="btn-move-to-cart">🛒 Move to cart</button>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="promo-banner">
          <div className="promo-text">
            <p className="promo-title">Super discount on more than 100 USD</p>
            <p className="promo-sub">Have you ever finally just write dummy info</p>
          </div>
          <button className="btn-shop-now">Shop now</button>
        </div>
      </div>
    </div>
  );
}
