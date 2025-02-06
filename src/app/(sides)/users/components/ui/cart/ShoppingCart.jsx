"use client"

import React, { useState, useEffect } from "react"
// import axiosInstance from '../../../../../../../axios/axiosinstance/axiosInstance'
import Image from "next/image"
import { Loader, X } from "lucide-react"

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    // {
    //       id: 1,
    //       name: "T-shirt",
    //       price: 500,
    //       quantity: 1,
    //       image:
    //         "https://img.freepik.com/free-photo/young-man-looking-aside-striped-t-shirt-hat-looking-thoughtful_176474-48610.jpg?uid=R156811553&ga=GA1.1.1576466112.1729750299&semt=ais_hybrid",
    //       dex: "awesome t-shirt with white strips",
    //     },
    //     {
    //       id: 2,
    //       name: "pants",
    //       price: 700,
    //       quantity: 1,
    //       image:
    //         "https://img.freepik.com/free-photo/view-beige-tone-colored-pants_23-2150773378.jpg?uid=R156811553&ga=GA1.1.1576466112.1729750299&semt=ais_hybrid",
    //       dex: "awesome pants in brown",
    //     },
    //     {
    //       id: 3,
    //       name: "shirt",
    //       price: 1000,
    //       quantity: 1,
    //       image:
    //         "https://img.freepik.com/free-photo/young-man-looking-aside-striped-t-shirt-hat-looking-thoughtful_176474-48610.jpg?uid=R156811553&ga=GA1.1.1576466112.1729750299&semt=ais_hybrid",
    //       dex: "awesome t-shirt with white strips",
    //     },
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { fetchCartItems() }, [])

  const fetchCartItems = async () => {
    try {
      const { data } = await axiosInstance.get("/RentalCart/my-cart")
      setCartItems(data)
    } catch (err) {
      setError("Failed to load your fashion selections")
    } finally {
      setIsLoading(false)
    }
  }
  
  console.log(cartItems);
  console.log(cartItems);
  
  const updateQuantity = async (id, newQuantity) => {
    try {
      await axiosInstance.put(`/api/cart/${id}`, { quantity: newQuantity })
      setCartItems(items => items.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ))
    } catch (err) {
      console.error("Quantity update failed", err)
    }
  }

  const removeItem = async (id) => {
    try {
      await axiosInstance.delete(`/api/cart/${id}`)
      setCartItems(items => items.filter(item => item.id !== id))
    } catch (err) {
      console.error("Removal failed", err)
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (isLoading) return (
    <div className="min-h-screen flex-center">
      <Loader className="animate-spin text-gray-500 h-8 w-8" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex-center text-red-500 text-lg">
      ⚠️ {error}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Your Style Selections</h1>
        <p className="text-gray-500">{cartItems.length} items in your wardrobe</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🧺</div>
          <p className="text-gray-500 text-lg">Your fashion cart awaits</p>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
            {cartItems.map(item => (
              <div key={item.id} className="relative group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow hover:bg-red-50 z-10"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>

                <div className="relative h-60 w-full bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.dex}</p>
                    </div>
                    <span className="font-semibold text-indigo-600">${item.price}/day</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-l"
                      >
                        −
                      </button>
                      <span className="px-3 w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-medium">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Summary Footer */}
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
  )
}

export default ShoppingCart






