import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../api";
import { useCart } from "../context/CartContext";
import ReactCountryFlag from "react-country-flag";
import { User, Search, Archive, Send, Globe } from "lucide-react";

// ── All static data unchanged from your original design ──────────────────────
const categories = [
  "Automobiles", "Clothes and wear", "Home interiors", "Computer and tech",
  "Tools, equipments", "Sports and outdoor", "Animal and pets", "Machinery tools", "More category",
];

const dealProducts = [
  { name: "Smart watches", discount: "-25%", img: "https://picsum.photos/seed/dealwatch/120/120" },
  { name: "Laptops",       discount: "-15%", img: "https://picsum.photos/seed/deallaptop/120/120" },
  { name: "GoPro cameras", discount: "-40%", img: "https://picsum.photos/seed/dealgopro/120/120" },
  { name: "Headphones",    discount: "-25%", img: "https://picsum.photos/seed/dealheadphones/120/120" },
  { name: "Canon cameras", discount: "-25%", img: "https://picsum.photos/seed/dealcanon/120/120" },
];

const timer = [
  { label: "Days", value: "04" },
  { label: "Hour", value: "13" },
  { label: "Min",  value: "34" },
  { label: "Sec",  value: "56" },
];

const homeOutdoorProducts = [
  { name: "Soft chairs",    price: 19,  img: "https://loremflickr.com/200/200/armchair?lock=101" },
  { name: "Sofa & chair",   price: 19,  img: "https://loremflickr.com/200/200/tablelamp?lock=102" },
  { name: "Kitchen dishes", price: 19,  img: "https://loremflickr.com/200/200/airmattress?lock=103" },
  { name: "Smart watches",  price: 19,  img: "https://loremflickr.com/200/200/terracottapot?lock=104" },
  { name: "Kitchen mixer",  price: 100, img: "https://loremflickr.com/200/200/foodprocessor?lock=105" },
  { name: "Blenders",       price: 39,  img: "https://loremflickr.com/200/200/coffeemachine?lock=106" },
  { name: "Home appliance", price: 19,  img: "https://loremflickr.com/200/200/fileorganizer?lock=107" },
  { name: "Coffee maker",   price: 10,  img: "https://loremflickr.com/200/200/pottedplant?lock=108" },
];

const electronicsProducts = [
  { name: "Smart watches",  price: 19,  img: "https://loremflickr.com/200/200/applewatch?lock=201" },
  { name: "Cameras",        price: 89,  img: "https://loremflickr.com/200/200/dslrcamera?lock=202" },
  { name: "Headphones",     price: 10,  img: "https://loremflickr.com/200/200/headphones?lock=203" },
  { name: "Smart watches",  price: 90,  img: "https://loremflickr.com/200/200/travelmug?lock=204" },
  { name: "Gaming set",     price: 35,  img: "https://loremflickr.com/200/200/gamingheadset?lock=205" },
  { name: "Laptops & PC",   price: 340, img: "https://loremflickr.com/200/200/laptop?lock=206" },
  { name: "Smartphones",    price: 19,  img: "https://loremflickr.com/200/200/tablet?lock=207" },
  { name: "Electric kettle",price: 240, img: "https://loremflickr.com/200/200/electrickettle?lock=208" },
];

const services = [
  { title: "Source from Industry Hubs",                  icon: Search,  img: "https://picsum.photos/seed/sourcehub/300/200" },
  { title: "Customize Your Products",                    icon: Archive, img: "https://picsum.photos/seed/customize/300/200" },
  { title: "Fast, reliable shipping by ocean or air",    icon: Send,    img: "https://picsum.photos/seed/shipping/300/200" },
  { title: "Product monitoring and inspection",          icon: Globe,   img: "https://picsum.photos/seed/monitoring/300/200" },
];

const regions = [
  { name: "Arabic Emirates", domain: "shopname.ae",    flag: "AE" },
  { name: "Australia",       domain: "shopname.au",    flag: "AU" },
  { name: "United States",   domain: "shopname.us",    flag: "US" },
  { name: "Russia",          domain: "shopname.ru",    flag: "RU" },
  { name: "Italy",           domain: "shopname.it",    flag: "IT" },
  { name: "Denmark",         domain: "shopname.dk",    flag: "DK" },
  { name: "France",          domain: "shopname.fr",    flag: "FR" },
  { name: "Arabic Emirates", domain: "shopname.ae",    flag: "AE" },
  { name: "China",           domain: "shopname.cn",    flag: "CN" },
  { name: "Great Britain",   domain: "shopname.co.uk", flag: "GB" },
];

// ── CategoryShowcase component (unchanged) ────────────────────────────────────
function CategoryShowcase({ title, bgImage, products }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 grid grid-cols-12 overflow-hidden">
      <div className="col-span-12 md:col-span-3 relative min-h-[170px]">
        <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10 p-6 flex flex-col justify-between">
          <h3 className="font-bold text-gray-900 text-xl leading-snug">{title}</h3>
          <button className="bg-white text-sm font-medium px-4 py-2 rounded w-fit shadow">Source now</button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-4">
        {products.map((p, i) => {
          const isLastColDesktop = (i + 1) % 4 === 0;
          const isLastRowDesktop = i >= products.length - 4;
          const borderClasses = ["border-b", "border-gray-100", isLastColDesktop ? "sm:border-r-0" : "sm:border-r", isLastRowDesktop ? "sm:border-b-0" : ""].join(" ");
          return (
            <div key={i} className={`flex items-center justify-between gap-3 p-5 ${borderClasses}`}>
              <div>
                <p className="text-sm text-gray-800 font-medium mb-2">{p.name}</p>
                <p className="text-xs text-gray-400 leading-tight">From</p>
                <p className="text-xs text-gray-400 leading-tight">USD {p.price}</p>
              </div>
              <img src={p.img} alt={p.name} className="w-14 h-14 object-cover rounded shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Home component ───────────────────────────────────────────────────────
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const { addToCart } = useCart();

  // ── Only the recommended section fetches from backend ────────────────────
  useEffect(() => {
    fetchFeaturedProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">

      {/* Hero — unchanged */}
      <section className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-12 gap-4">
        <div className="hidden lg:block col-span-2 bg-white rounded-lg border border-gray-200 text-sm overflow-hidden h-fit">
          {categories.map((c, i) => (
            <div key={c} className={`px-4 py-2.5 cursor-pointer text-xs ${i === 0 ? "bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
              {c}
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-7 rounded-lg overflow-hidden relative bg-gradient-to-br from-teal-100 to-emerald-100 min-h-[300px] flex items-start justify-start px-8 pt-10">
          <div className="z-10 max-w-xs text-left">
            <p className="text-gray-900 font-semibold text-2xl mb-1">Latest trending</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Electronic items</h1>
            <button className="bg-white px-5 py-2.5 rounded text-sm font-medium shadow hover:shadow-md">Learn more</button>
          </div>
          <img src="https://picsum.photos/seed/herotech/420/300" alt="trending electronics" className="absolute right-0 bottom-0 w-1/2 h-4/5 object-cover rounded-tl-lg" />
        </div>

        <div className="col-span-12 lg:col-span-3 flex flex-row lg:flex-col gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <User size={18} className="text-gray-500" />
              </div>
              <p className="text-lg text-gray-700 leading-snug">Hi, user<br />let's get started</p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 text-sm font-medium mb-2">Join now</button>
            <button className="w-full border border-gray-300 rounded py-2 text-sm font-medium hover:bg-gray-50">Log in</button>
          </div>
          <div className="bg-orange-500 text-white rounded-lg p-4 text-lg font-medium flex-1 flex items-center">Get US $10 off with a new supplier</div>
          <div className="bg-cyan-600 text-white rounded-lg p-4 text-lg font-medium flex-1 flex items-center">Send quotes with supplier preferences</div>
        </div>
      </section>

      {/* Deals and offers — unchanged */}
      <section className="max-w-7xl mx-auto px-4 py-2">
        <div className="bg-white rounded-lg border border-gray-200 p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 items-center">
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h3 className="font-bold text-lg">Deals and offers</h3>
            <p className="text-xs text-gray-400 mb-3">Hygiene equipments</p>
            <div className="flex gap-1.5">
              {timer.map(t => (
                <div key={t.label} className="bg-gray-800 text-white rounded px-2 py-1.5 text-center w-12">
                  <div className="text-sm font-bold leading-none">{t.value}</div>
                  <div className="text-[9px] text-gray-300 mt-0.5">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
          {dealProducts.map(p => (
            <div key={p.name} className="text-center">
              <div className="relative bg-gray-50 rounded-lg p-3 mb-2">
                <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">{p.discount}</span>
                <img src={p.img} alt={p.name} className="h-16 w-full object-cover rounded mx-auto" />
              </div>
              <p className="text-xs text-gray-600">{p.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category showcases — unchanged */}
      <section className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-4">
        <CategoryShowcase title="Home and outdoor" bgImage="https://loremflickr.com/400/400/livingroom,sofa?lock=301" products={homeOutdoorProducts} />
        <CategoryShowcase title="Consumer electronics and gadgets" bgImage="https://loremflickr.com/400/400/gadgets,electronics?lock=302" products={electronicsProducts} />
      </section>

      {/* Send quote CTA — unchanged */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative rounded-lg overflow-hidden grid grid-cols-12 min-h-[260px]">
          <img src="https://picsum.photos/seed/shippingport/1200/400" alt="shipping" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-900/70"></div>
          <div className="relative col-span-12 md:col-span-6 p-8 md:p-10 flex flex-col justify-center text-white">
            <h2 className="text-2xl font-bold mb-3 max-w-sm leading-snug">An easy way to send requests to all suppliers</h2>
            <p className="text-sm text-blue-100 max-w-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="relative col-span-12 md:col-span-6 flex items-center md:justify-end p-6 md:p-8">
            <div className="bg-white rounded-lg p-5 w-full max-w-sm shadow-lg">
              <h3 className="font-semibold text-sm mb-3">Send quote to suppliers</h3>
              <input placeholder="What item you need?" className="w-full border border-gray-200 rounded px-3 py-2 text-xs mb-2 outline-none focus:border-blue-500" />
              <textarea placeholder="Type more details" className="w-full border border-gray-200 rounded px-3 py-2 text-xs mb-2 h-16 resize-none outline-none focus:border-blue-500" />
              <div className="flex gap-2 mb-3">
                <input placeholder="Quantity" className="flex-1 border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500" />
                <select className="border border-gray-200 rounded px-2 text-xs text-gray-600"><option>Pcs</option></select>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2.5 text-xs font-medium">Send inquiry</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recommended items — DYNAMIC from backend ── */}
      <section className="max-w-7xl mx-auto px-4 py-2">
        <h3 className="font-bold text-lg mb-4">Recommended items</h3>
        {loading ? (
          <p className="text-sm text-gray-400 py-6 text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map(p => (
              <div key={p._id} className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1">${p.price}</p>
                  <p className="text-xs text-gray-500 leading-snug line-clamp-2">{p.name}</p>
                  <button
                    onClick={() => addToCart(p)}
                    className="mt-3 w-full bg-blue-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Extra services — unchanged */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h3 className="font-bold text-lg mb-4">Our extra services</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative rounded-lg overflow-hidden h-32">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2"><Icon size={16} className="text-blue-600" /></div>
                <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium leading-snug">{s.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suppliers by region — unchanged */}
      <section className="max-w-7xl mx-auto px-4 py-2 pb-8">
        <h3 className="font-bold text-lg mb-4">Suppliers by region</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
          {regions.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <ReactCountryFlag countryCode={r.flag} svg style={{ width: "20px", height: "20px" }} />
              <div>
                <p className="text-sm text-gray-800 leading-tight">{r.name}</p>
                <p className="text-xs text-gray-400 leading-tight">{r.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}