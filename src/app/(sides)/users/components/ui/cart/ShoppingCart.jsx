"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import { X, Minus, Plus, Link } from "lucide-react";
import LoadingSkeleton from "../loading/loadingskel";
import { useRouter } from "next/navigation";
import CustomLoading from "../../ui/Loader";
import { toast } from "react-toastify";
import Loading from "../Loader";
function ShoppingCart() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hide, sethide] = useState(false);

  const fetchCartItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("userData");
      if (!token) throw new Error("Authentication required");

      const response = await axiosInstance.get("/RentalCart/my-cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(response.data.data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart items");
      if (err.response.status == 401) {
        toast.error("please loagin");
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("userData");
      if (!token) throw new Error("Authentication required");

      await axiosInstance.put(
        `/RentalCart/update-quantity/${itemId}?newQuantity=${newQuantity}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((items) =>
        items.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: Math.max(1, newQuantity) }
            : item
        )
      );
    } catch (err) {
      console.error("Quantity update failed:", err);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const removeItem = async (itemId) => {
    try {
      sethide(true);
      const token = localStorage.getItem("userData");
      if (!token) throw new Error("Authentication required");

      await axiosInstance.delete(`/RentalCart/remove-item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((items) => items.filter((item) => item.itemId !== itemId));
    } catch (err) {
      console.error("Item removal failed:", err);
      setError("Failed to remove item. Please try again.");
    } finally {
      sethide(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0
  );

  if (isLoading)
    return (
      <div className="min-h-screen flex-center">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex-center text-red-500 text-lg">
        ⚠️ {error}
      </div>
    );

  const handlcheckout = () => {
    router.push("/users/checkout");
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Style Selections
        </h1>
        <p className="text-gray-500">
          {cartItems.length} items in your wardrobe
        </p>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🧺</div>
          <p className="text-gray-500 text-lg">Your fashion cart awaits</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {cartItems.map((item, i) => (
              <div
                key={item.itemId}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all w-full max-w-[300px] border ${
                  hide && "hidden"
                }`}
              >
                <div className="relative">
                  <button
                    onClick={() => removeItem(item.itemId)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm hover:bg-gray-100 z-10"
                  >
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

                <div className="p-2 space-y-1">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-sm line-clamp-1">
                      {item.productName}
                    </h3>
                    <span className="text-[#0E0E25] text-sm">
                      {item.itemPrice}/day
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(item.itemId, item.quantity - 1)
                        }
                        className="px-1 py-0.5 text-gray-500 hover:bg-gray-100 rounded-l"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-2 w-2" />
                      </button>
                      <span className="px-1 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.itemId, item.quantity + 1)
                        }
                        className="px-1 py-0.5 text-gray-500 hover:bg-gray-100 rounded-r"
                      >
                        <Plus className="h-2 w-2" />
                      </button>
                    </div>
                    <span className="font-medium text-[#0E0E25] text-sm">
                      {(item.itemPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white border-t shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xl font-bold">
                  Total Estimate:{" "}
                  <span className="text-[#0E0E25]">${total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Includes all selected items
                </p>
              </div>
              <button
                className="bg-[#0E0E25] text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
                onClick={() => handlcheckout()}
              >
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
