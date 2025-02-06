// "use client"

// import React, { useState, useEffect } from "react"
// import axiosInstance from '../../../../../../../axios/axiosinstance/axiosInstance';
// import Image from "next/image";



// function ShoppingCart() {
//   const [cartItems, setCartItems] = useState([

//     { id: 1, name: 'T-shirt', price: 500, quantity: 1, image: 'https://img.freepik.com/free-photo/young-man-looking-aside-striped-t-shirt-hat-looking-thoughtful_176474-48610.jpg?uid=R156811553&ga=GA1.1.1576466112.1729750299&semt=ais_hybrid', dex:'awsome t-shirt with white strips'},
//     { id: 2, name: 'pants', price: 700, quantity: 1, image: 'https://img.freepik.com/free-photo/view-beige-tone-colored-pants_23-2150773378.jpg?uid=R156811553&ga=GA1.1.1576466112.1729750299&semt=ais_hybrid', dex:'awsome pants in brown'},
//     { id: 3, name: 'shirt', price: 1000, quantity: 1, image: 'https://img.freepik.com/free-photo/young-man-looking-aside-striped-t-shirt-hat-looking-thoughtful_176474-48610.jpg?uid=R156811553&ga=GA1.1.1576466112.1729750299&semt=ais_hybrid', dex:'awsome t-shirt with white strips'},
    
//   ])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)


//   // useEffect(() => {
//   //   fetchCartItems()
//   // }, [])


//   // const fetchCartItems = async () => {
//   //   setIsLoading(true)
//   //   setError(null)
//   //   try {
//   //     const response = await axiosInstance.get("/api/cart")
//   //     setCartItems(response.data)
//   //   } catch (err) {
//   //     setError("Failed to fetch cart items")
//   //     console.error(err)
//   //   }
//   //   setIsLoading(false)
//   // }

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)


//   // const updateQuantity = async (id, newQuantity) => {
//   //   try {
//   //     await axiosInstance.put(`/api/cart/${id}`, { quantity: newQuantity })
//   //     setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
//   //   } catch (err) {
//   //     console.error("Failed to update quantity", err)
//   //   }
//   // }


//   // const removeItem = async (id) => {
//   //   try {
//   //     await axiosInstance.delete(`/api/cart/${id}`)
//   //     setCartItems(cartItems.filter((item) => item.id !== id))
//   //   } catch (err) {
//   //     console.error("Failed to remove item", err)
//   //   }
//   // }


//   // if (isLoading) return <div className="text-center">Loading cart...</div>


//   // if (error) return <div className="text-center text-red-500">{error}</div>

//   return (
//     <>
//     <div className="p-4 flex justify-center gap-4">
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {/* Map through cart items */}
//           {cartItems.map((item) => (
//             <div className="w-64 h-80 border rounded p-4 shadow-md" key={item.id}>
//               <div className="border rounded h-48 relative w-full">
//                 <Image
//                   src={item.image}
//                   alt="ser"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="py-3 flex flex-col gap-2">
//                 <div className=" h-14 overflow-auto scrollbar-none">
//                   <div className="font-semibold font-serif">{item.name}</div>
//                   <div className="text-sm text-slate-400">{item.dex}</div>
//                 </div>

//                 <div className="flex justify-between">
//                   <div className="font-semibold font-Libre">
//                     ${item.price}/day
//                   </div>
//                   <div className="border bg-slate-950 text-white px-2 rounded cursor-pointer">
//                     add to cart
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {/* Display total */}
//         </>
//       )}
//     </div>

//           <div className="flex justify-end pr-96">
//             <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
//           </div>
      
//     </>
//   );
// }

// export default ShoppingCart


















"use client"

import React, { useState } from "react"
import Image from "next/image"

function ShoppingCart() {
  const [wishItems, setWishItems] = useState([
    {
      id: 1,
      name: "Premium T-Shirt",
      price: 500,
      quantity: 1,
      image: "https://img.freepik.com/free-photo/young-man-looking-aside-striped-t-shirt-hat-looking-thoughtful_176474-48610.jpg",
      dex: "Organic cotton striped t-shirt with premium finish",
      category: "Tailoring"
    },
    {
      id: 2,
      name: "Linen Pants",
      price: 700,
      quantity: 1,
      image: "https://img.freepik.com/free-photo/view-beige-tone-colored-pants_23-2150773378.jpg",
      dex: "Beige linen pants with adjustable waistband",
      category: "Rental"
    },
    {
      id: 3,
      name: "Designer Shirt",
      price: 1000,
      quantity: 1,
      image: "https://img.freepik.com/free-photo/young-man-looking-aside-striped-t-shirt-hat-looking-thoughtful_176474-48610.jpg",
      dex: "Non-iron formal shirt with French cuffs",
      category: "Laundry"
    },
  ])

  const total = wishItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const removeItem = (id) => {
    setWishItems(wishItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    setWishItems(wishItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Saved Items</h2>
        <p className="text-gray-500">{wishItems.length} items in your wishlist</p>
      </div>

      {wishItems.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🛍️</div>
          <p className="text-gray-500 text-lg">No items saved yet</p>
        </div>
      ) : (
        <>
          {/* Items Grid */}
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
            {wishItems.map((item) => (
              <div 
                key={item.id}
                className="group relative border rounded-xl overflow-hidden bg-white transition-all hover:shadow-lg"
              >
                {/* Remove Button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-100 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Image Section */}
                <div className="relative h-60 w-full bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Item Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 h-12">{item.dex}</p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold">${item.price}/day</span>
                    <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                      <span>Move to Cart</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Summary Bar */}
          <div className="sticky bottom-0 bg-white border-t shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold">
                  Total: <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
                <span className="text-gray-500 text-sm">Excluding service charges</span>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShoppingCart