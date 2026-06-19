function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Banner */}
      <div className="bg-blue-50 flex items-center justify-between px-16 py-10 mx-4 my-3 rounded">
        <div>
          <p className="text-gray-500 text-sm mb-1">Latest Trending</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Electronic Items</h1>
          <button className="bg-green-500 text-white px-5 py-2 rounded text-sm">
            Learn More
          </button>
        </div>
        <div className="text-9xl">🎧</div>
      </div>

      {/* Deals and Offers */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-lg mb-3">Deals and offers</h2>
        <div className="grid grid-cols-5 gap-4">
          {['Smart watch', 'Laptop', 'Camera', 'Headphones', 'Smart phone'].map((item, i) => (
            <div key={i} className="bg-white rounded shadow p-3 text-center">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm font-medium">{item}</p>
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded mt-1 inline-block">-25%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Home and Outdoor */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 rounded p-4">
            <h3 className="font-bold mb-1">Home and outdoor</h3>
            <button className="text-xs text-blue-600">Source now →</button>
          </div>
          {['Soft Sofas', 'Dining Table', 'Kitchen', 'Smart watches'].map((item, i) => (
            <div key={i} className="bg-white rounded shadow p-3 text-center">
              <div className="text-3xl mb-2">🛋️</div>
              <p className="text-xs">{item}</p>
              <p className="text-xs text-gray-400">From $19.99</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consumer Electronics */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded p-4">
            <h3 className="font-bold mb-1">Consumer electronics</h3>
            <button className="text-xs text-blue-600">Source now →</button>
          </div>
          {['Smart watches', 'Cameras', 'Headphones', 'Smart TV'].map((item, i) => (
            <div key={i} className="bg-white rounded shadow p-3 text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-xs">{item}</p>
              <p className="text-xs text-gray-400">From $99.99</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Items */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-lg mb-3">Recommended Items</h2>
        <div className="grid grid-cols-5 gap-4">
          {[
            { name: 'T-Shirt', price: '$10.30' },
            { name: 'Jacket', price: '$12.50' },
            { name: 'Suit', price: '$32.00' },
            { name: 'Bag', price: '$24.00' },
            { name: 'Backpack', price: '$39.00' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded shadow p-3 text-center">
              <div className="text-4xl mb-2">👕</div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-blue-600 font-bold text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-blue-600 text-white text-center py-8 mt-4">
        <h3 className="font-bold text-lg mb-2">Subscribe to our newsletter</h3>
        <p className="text-sm mb-4">Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded text-gray-800 text-sm w-64"
          />
          <button className="bg-green-500 px-6 py-2 rounded text-sm font-semibold">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home