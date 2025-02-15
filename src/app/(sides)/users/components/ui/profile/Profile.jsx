import React from "react";
import { FaShoppingCart, FaHeart, FaShoppingBag, FaKey } from "react-icons/fa";

const UserProfile = () => {
  const user = {
    name: "Muhammed Saheen",
    email: "muhammed@gmail.com",
    totalOrders: 10,
    wishlistItems: 5,
    cartItemsCount: 3, // Total number of items in the cart
  };

  return (
    <div className="w-[90%] py-4 block mx-auto">
      {/* Profile Section */}
      <div className="bg-gradient-to-r from-[#0E0E25] to-purple-500 text-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 md:w-20 md:h-20 bg-white text-blue-500 text-4xl md:text-3xl font-bold flex items-center justify-center rounded-full">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-3xl font-semibold md:text-2xl">{user.name}</h2>
          <p className="text-gray-200 text-lg md:text-base">{user.email}</p>
        </div>
      </div>

      {/* Stats Section - Orders, Wishlist, Cart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Total Orders Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <FaShoppingBag className="text-blue-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{user.totalOrders}</p>
          </div>
        </div>

        {/* Wishlist Items Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <FaHeart className="text-red-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Wishlist Items</h3>
            <p className="text-2xl font-bold text-gray-900">{user.wishlistItems}</p>
          </div>
        </div>

        {/* Cart Items Count Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
          <FaShoppingCart className="text-green-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Cart Items</h3>
            <p className="text-2xl font-bold text-gray-900">{user.cartItemsCount}</p>
          </div>
        </div>
      </div>

      {/* Reset Password Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-[#0E0E25] text-white flex items-center gap-3 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition">
          <FaKey /> Reset Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
