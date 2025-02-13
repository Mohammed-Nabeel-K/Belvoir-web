"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from '../../../../../../../axios/axiosinstance/axiosInstance';
import { X, Minus, Plus } from "lucide-react";
import LoadingSkeleton from "../loading/loadingskel";

function ShoppingCart() {
  // State management
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data fetching
  const fetchCartItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("userData");
      if (!token) return console.error("Authentication required");

      const response = await axiosInstance.get("/RentalCart/my-cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCartItems(response.data.data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your fashion selections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchCartItems() }, []);

  // Cart calculations
  const total = cartItems.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);

  // Loading and error states
  if (isLoading) return (
    <div className="min-h-screen flex-center">
      <LoadingSkeleton />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex-center text-red-500 text-lg">
      ⚠️ {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Your Style Selections</h1>
        <p className="text-gray-500">{cartItems.length} items in your wardrobe</p>
      </header>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🧺</div>
          <p className="text-gray-500 text-lg">Your fashion cart awaits</p>
        </div>
      ) : (
        <>
          {/* Items Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {cartItems.map((item) => (
              <div
                key={item.itemId}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all w-full max-w-[300px] border"
              >
                {/* Image Section */}
                <div className="relative">
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm hover:bg-gray-100 z-10">
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                  <div className="aspect-square overflow-hidden rounded-t-lg p-2">
                    <img
                      src={item.primaryImageUrl || "/placeholder.svg"}
                      alt={item.productName}
                      className="object-cover w-full h-full rounded-md shadow-sm"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-2 space-y-1">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-sm line-clamp-1">{item.productName}</h3>
                    <span className="text-indigo-600 text-sm">${item.itemPrice}/day</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center border rounded-md">
                      <button className="px-1 py-0.5 text-gray-500 hover:bg-gray-100 rounded-l">
                        <Minus className="h-2 w-2" />
                      </button>
                      <span className="px-1 w-4 text-center">{item.quantity}</span>
                      <button className="px-1 py-0.5 text-gray-500 hover:bg-gray-100 rounded-r">
                        <Plus className="h-2 w-2" />
                      </button>
                    </div>
                    <span className="font-medium text-indigo-600 text-sm">
                      ${(item.itemPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Footer */}
          <div className="sticky bottom-0 bg-white border-t shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xl font-bold">
                  Total Estimate: <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">Includes all selected items</p>
              </div>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
                Secure Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;












//   // const updateQuantity = async (id, newQuantity) => {
//   //   try {
//   //     await axiosInstance.put(`/api/cart/${id}`, { quantity: newQuantity })
//   //     setCartItems(items => items.map(item => 
//   //       item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
//   //     ))
//   //   } catch (err) {
//   //     console.error("Quantity update failed", err)
//   //   }
//   // }

//   // const removeItem = async (id) => {
//   //   try {
//   //     await axiosInstance.delete(`/api/cart/${id}`)
//   //     setCartItems(items => items.filter(item => item.id !== id))
//   //   } catch (err) {
//   //     console.error("Removal failed", err)
//   //   }
//   // }