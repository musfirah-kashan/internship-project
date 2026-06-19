import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-blue-600 font-bold text-xl">Brand</div>

      {/* Search Bar */}
      <div className="flex items-center border rounded overflow-hidden w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-full outline-none text-sm"
        />
        <button className="bg-blue-600 text-white px-4 py-2 text-sm">
          Search
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>

    </nav>
  )
}

export default Navbar