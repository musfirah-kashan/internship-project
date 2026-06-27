import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchCategories } from "../api";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const BASE = "http://localhost:5000/api";

const emptyForm = {
  name: "", price: "", originalPrice: "", image: "", description: "",
  categoryId: "", stock: "", rating: "", reviews: "",
  free: false, featured: false, dealProduct: false, recommended: false,
  discount: "", homeCategory: "", size: "", color: "", material: "",
};

export default function AdminPanel() {
  const { user }       = useAuth();
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [form,       setForm]       = useState(emptyForm);
  const [saving,     setSaving]     = useState(false);
  const [msg,        setMsg]        = useState("");

  const authHeader = { "Content-Type": "application/json", Authorization: `Bearer ${user?.token}` };

  // Load products and categories
  const loadAll = async () => {
    setLoading(true);
    const [pRes, cRes] = await Promise.all([
      fetch(`${BASE}/products?limit=100`),
      fetch(`${BASE}/categories`),
    ]);
    const pJson = await pRes.json();
    const cJson = await cRes.json();
    setProducts(pJson.data  ?? []);
    setCategories(cJson.data ?? []);
    setLoading(false);
  };

  useEffect(() => { loadAll(); }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
    setMsg("");
  };

  const openEdit = (product) => {
    setForm({
      name:          product.name         ?? "",
      price:         product.price        ?? "",
      originalPrice: product.originalPrice ?? "",
      image:         product.image        ?? "",
      description:   product.description  ?? "",
      categoryId:    product.categoryId?._id ?? product.categoryId ?? "",
      stock:         product.stock        ?? "",
      rating:        product.rating       ?? "",
      reviews:       product.reviews      ?? "",
      free:          product.free         ?? false,
      featured:      product.featured     ?? false,
      dealProduct:   product.dealProduct  ?? false,
      recommended:   product.recommended  ?? false,
      discount:      product.discount     ?? "",
      homeCategory:  product.homeCategory ?? "",
      size:          product.size         ?? "",
      color:         product.color        ?? "",
      material:      product.material     ?? "",
    });
    setEditId(product._id);
    setShowForm(true);
    setMsg("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const url    = editId ? `${BASE}/products/${editId}` : `${BASE}/products`;
      const method = editId ? "PUT" : "POST";
      const body   = {
        ...form,
        price:         Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        stock:         Number(form.stock),
        rating:        Number(form.rating),
        reviews:       Number(form.reviews),
      };
      const res  = await fetch(url, { method, headers: authHeader, body: JSON.stringify(body) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setMsg(editId ? "✅ Product updated!" : "✅ Product added!");
      setShowForm(false);
      loadAll();
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res  = await fetch(`${BASE}/products/${id}`, { method: "DELETE", headers: authHeader });
    const json = await res.json();
    if (json.success) loadAll();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500">Manage products</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${msg.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {msg}
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">{editId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Text fields */}
              {[
                ["name",         "Product Name *",    "text",   true],
                ["price",        "Price *",           "number", true],
                ["originalPrice","Original Price",    "number", false],
                ["image",        "Image URL *",       "text",   true],
                ["stock",        "Stock *",           "number", true],
                ["rating",       "Rating (0-10)",     "number", false],
                ["reviews",      "Reviews count",     "number", false],
                ["discount",     "Discount (e.g. -25%)", "text", false],
                ["size",         "Size",              "text",   false],
                ["color",        "Color",             "text",   false],
                ["material",     "Material",          "text",   false],
              ].map(([key, label, type, required]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    type={type}
                    required={required}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    step={type === "number" ? "any" : undefined}
                  />
                </div>
              ))}

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                <select
                  required
                  value={form.categoryId}
                  onChange={e => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Home category */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Home Section</label>
                <select
                  value={form.homeCategory}
                  onChange={e => setForm({ ...form, homeCategory: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">None</option>
                  <option value="home-outdoor">Home & Outdoor</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>

              {/* Description - full width */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-6">
                {[
                  ["featured",    "Featured"],
                  ["recommended", "Recommended"],
                  ["dealProduct", "Deal Product"],
                  ["free",        "Free Shipping"],
                ].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.checked })}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 lg:col-span-3 flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-lg text-sm font-semibold"
                >
                  <Check size={16} />
                  {saving ? "Saving..." : editId ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">All Products ({products.length})</h2>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Flags</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                          <span className="font-medium text-gray-800 line-clamp-2 max-w-[200px]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {p.categoryId?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">${p.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                          {p.stock > 0 ? p.stock : "Out"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {p.featured    && <span className="px-1.5 py-0.5 bg-blue-50  text-blue-600  text-[10px] rounded">Featured</span>}
                          {p.recommended && <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 text-[10px] rounded">Rec.</span>}
                          {p.dealProduct && <span className="px-1.5 py-0.5 bg-red-50   text-red-600   text-[10px] rounded">Deal</span>}
                          {p.free        && <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] rounded">Free</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}