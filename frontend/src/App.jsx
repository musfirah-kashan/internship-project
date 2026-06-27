import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import Newsletter   from "./components/Newsletter";
import Home         from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart         from "./pages/Cart";
import Login        from "./pages/Login";
import Register     from "./pages/Register";
import AdminPanel   from "./pages/AdminPanel";
import { CartProvider }  from "./context/CartContext";
import { AuthProvider }  from "./context/AuthContext";
import { AdminRoute }    from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/"           element={<Home />} />
            <Route path="/products"   element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart"       element={<Cart />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/register"   element={<Register />} />

            {/* Admin only route */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
          </Routes>
          <Newsletter />
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;