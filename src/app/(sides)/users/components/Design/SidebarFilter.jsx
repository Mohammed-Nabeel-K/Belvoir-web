import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function Sidebar({
  setMaxPrice,
  setMinPrice,
  setSort,
  setDesignType,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["Casual", "Formal", "Party", "Traditional"];

  return (
    <div className="flex flex-col">
      <button
        className="md:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMoreVertical className="text-2xl text-gray-700" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 w-64 bg-white p-6 shadow-xl border-r border-gray-200 rounded-r-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col z-50 h-full`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Filter by:
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Price</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSort("false")}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-300"
            >
              Ascending
            </button>
            <button
              onClick={() => setSort("true")}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-300"
            >
              Descending
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xl font-semibold text-gray-800">
            Price
          </label>
          <div className="flex">
            <select
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
            >
              <option disabled>Min-price</option>
              <option>0</option>
              <option>100</option>
              <option>500</option>
              <option>1000</option>
              <option>2000</option>
            </select>
            <p className="mx-2">to</p>
            <select
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
            >
              <option disabled>Max-price</option>
              <option>500</option>
              <option>1000</option>
              <option>2000</option>
            </select>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Category</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setDesignType(category)}
              >
                <input
                  type="radio"
                  name="category"
                  className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <label className="text-gray-700 cursor-pointer">
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
