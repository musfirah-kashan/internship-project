import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {
  User, MessageCircle, Heart, ShoppingCart, Menu, ChevronDown, Search, LogOut, Shield,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { fetchCategories } from "../api";

export default function Navbar() {
  const { cartCount }            = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate                 = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [searchTerm, setSearchTerm]   = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  // Fetch categories for the "All category" dropdown
  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedCat) params.append("categoryId", selectedCat);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      {/* Top row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 lg:gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-blue-600 p-1.5 rounded">
            <ShoppingCart className="text-white" size={18} />
          </div>
          <span className="font-bold text-lg">Brand</span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 hidden md:flex max-w-xl border-2 border-blue-500 rounded-lg overflow-hidden">
          <input
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 text-sm outline-none"
          />
          <div className="border-l-2 border-blue-500 w-px" />
          {/* Category select populated from backend */}
          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            className="border-t border-b border-gray-300 px-2 text-sm font-semibold bg-white text-gray-700 max-w-[130px]"
          >
            <option value="">All category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 text-sm font-medium flex items-center gap-1.5">
            <Search size={15} />
            Search
          </button>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-4 lg:gap-5 text-[11px] text-gray-600 shrink-0 ml-auto">
          {user ? (
            <>
              <div className="flex flex-col items-center gap-1 text-blue-600">
                <User size={18} />
                <span className="max-w-[60px] truncate">{user.name}</span>
              </div>
              {isAdmin && (
                <Link to="/admin" className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
                  <Shield size={18} />
                  Admin
                </Link>
              )}
              <button onClick={logout} className="flex flex-col items-center gap-1 cursor-pointer hover:text-red-500">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
                <User size={18} />
                Login
              </Link>
              <Link to="/register" className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 hidden sm:flex">
                <MessageCircle size={18} />
                Register
              </Link>
            </>
          )}
          <div className="hidden sm:flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600">
            <Heart size={18} />
            Orders
          </div>
          <Link to="/cart" className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-600 relative">
            <div className="relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
            My cart
          </Link>
        </div>
      </div>

      {/* Bottom nav row - categories from backend */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs lg:text-sm overflow-x-auto">
          <nav className="flex items-center gap-4 lg:gap-6 text-gray-700 whitespace-nowrap">
            {/* "All category" dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCatMenu(prev => !prev)}
                className="flex items-center gap-1 font-medium text-gray-900 hover:text-blue-600"
              >
                <Menu size={15} />
                All category
                <ChevronDown size={13} />
              </button>
              {showCatMenu && (
                <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-52 py-1">
                  <Link
                    to="/products"
                    onClick={() => setShowCatMenu(false)}
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    All categories
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat._id}
                      to={`/products?categoryId=${cat._id}`}
                      onClick={() => setShowCatMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/products" className="cursor-pointer hover:text-blue-600">Hot offers</Link>
            <span className="cursor-pointer hover:text-blue-600">Gift boxes</span>
            <span className="cursor-pointer hover:text-blue-600">Projects</span>
            <span className="cursor-pointer hover:text-blue-600">Menu item</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              Help <ChevronDown size={13} />
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-4 text-gray-700 whitespace-nowrap">
            <span className="flex items-center gap-1 cursor-pointer font-semibold">
              English, USD <ChevronDown size={13} />
            </span>
            <span className="flex items-center gap-1 cursor-pointer font-semibold">
              Ship to <ReactCountryFlag countryCode="DE" svg style={{ width: "20px", height: "20px" }} />{" "}
              <ChevronDown size={13} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}