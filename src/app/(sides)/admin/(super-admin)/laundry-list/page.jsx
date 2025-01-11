"use client"
import React, { useState } from "react";

const LaundryList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const laundryShops = [
    { id: 1, name: "Shop 1", email: "shop1@example.com", phone: "1234567890", blocked: false },
    { id: 2, name: "Shop 2", email: "shop2@example.com", phone: "0987654321", blocked: true },
    { id: 3, name: "Shop 3", email: "shop3@example.com", phone: "5678901234", blocked: false },
  ];

  const totalShops = laundryShops.length;
  const blockedShops = laundryShops.filter((shop) => shop.blocked).length;
  const activeShops = totalShops - blockedShops;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-700">Laundry Shop List</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Shops", value: totalShops, bgColor: "bg-blue-100" },
            { label: "Blocked Shops", value: blockedShops, bgColor: "bg-red-100" },
            { label: "Active Shops", value: activeShops, bgColor: "bg-green-100" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} p-6 rounded-lg shadow-lg relative after:content-[''] after:absolute after:inset-0 after:top-3 after:left-3 after:bg-gray-200 after:rounded-lg after:-z-10`}
            >
              <h2 className="text-xl font-semibold text-gray-700">{stat.label}</h2>
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search for laundry shops..."
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
            + Add New Shop
          </button>
        </div>

    
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-200 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Si No</th>
                <th className="px-6 py-3 text-left">Shop Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone Number</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {laundryShops.map((shop, index) => (
                <tr
                  key={shop.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{shop.name}</td>
                  <td className="px-6 py-3">{shop.email}</td>
                  <td className="px-6 py-3">{shop.phone}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className={`px-4 py-2 rounded-lg text-white shadow-md ${
                        shop.blocked
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {shop.blocked ? "Unblock" : "Block"}
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

export default LaundryList;
