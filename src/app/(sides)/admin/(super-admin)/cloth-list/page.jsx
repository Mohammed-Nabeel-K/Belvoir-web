"use client"
import React, { useState } from "react";

const ClothList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clothes = [
    {
      id: 1,
      name: "Cotton Shirt",
      image: "https://via.placeholder.com/100",
      category: "Shirts",
      price: "$25",
      quantity: 50,
    },
    {
      id: 2,
      name: "Denim Jeans",
      image: "https://via.placeholder.com/100",
      category: "Pants",
      price: "$40",
      quantity: 30,
    },
    {
      id: 3,
      name: "Silk Scarf",
      image: "https://via.placeholder.com/100",
      category: "Accessories",
      price: "$15",
      quantity: 70,
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      
        <h1 className="text-3xl font-bold text-gray-700">Cloth List</h1>

    
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search for clothes..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute top-3 left-3 w-6 h-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M5.5 11a6 6 0 1012 0 6 6 0 00-12 0z"
              />
            </svg>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
            + Add New Cloth
          </button>
        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Cloth ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-center">Edit</th>
                <th className="px-6 py-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {clothes.map((cloth, index) => (
                <tr
                  key={cloth.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3">{cloth.id}</td>
                  <td className="px-6 py-3">{cloth.name}</td>
                  <td className="px-6 py-3">
                    <img
                      src={cloth.image}
                      alt={cloth.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="px-6 py-3">{cloth.category}</td>
                  <td className="px-6 py-3">{cloth.price}</td>
                  <td className="px-6 py-3">{cloth.quantity}</td>
                  <td className="px-6 py-3 text-center">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClothList;
