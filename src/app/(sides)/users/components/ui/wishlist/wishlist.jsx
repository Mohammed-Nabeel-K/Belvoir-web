"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import { X, Heart, ShoppingCart, BadgeCheck, Loader2 } from "lucide-react";
import LoadingSkeleton from "../loading/loadingskel";
import Loader from "../Loader";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation"
function Wishlist() {

  const router=useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingCart, setLoadingCart] = useState("idle");
  const [hide, sethide] = useState(false);



  const fetchWishlistItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("userData");
      if (!token) throw new Error("Authentication required");

      const response = await axiosInstance.get("/Rental/whishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlistItems(response.data.data);

      console.log(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load wishlist items");
      if(err.response.status==401){
        toast.error("please loagin")
        router.push("/login")
      }

    }finally{
      setIsLoading(false)
    }
  };

  const addToCart = async (itemId) => {
    setLoadingCart((prev) => ({ ...prev, [itemId]: "loading" }));
    const token = localStorage.getItem("userData");
    try {
      await axiosInstance.post(
        "/RentalCart/AddToCart",
        { productId: itemId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoadingCart((prev) => ({ ...prev, [itemId]: "success" }));
    } catch (error) {
      console.error("cart", error);
      setLoadingCart((prev) => ({ ...prev, [itemId]: "failed" }));
    }
  };

  const removeFromWishList = async (item) => {
    const token = localStorage.getItem("userData");
    try {
      sethide(true);
      setIsLoading(true)
       await axiosInstance.post(
        `/Rental/whishlist?productid=${item}`, // Updated endpoint with query parameter
        {}, // Empty body since productid is in query params
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchWishlistItems();
    } catch (error) {
      console.error("wish", error);
    } finally{
      sethide(false)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex-center text-red-500 text-lg">
        ⚠️ {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        <p className="text-gray-500">{wishlistItems?.length} items saved</p>
      </header>

      {wishlistItems.length < 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">❤️</div>
          <p className="text-gray-500 text-lg">
            Your wishlist is currently empty
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {wishlistItems.map((item) => (
            <div
              key={item.productId}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all w-full max-w-[300px] border ${
                hide && "hidden"
              }`}
            >
              <div className="relative">
                <button
                  onClick={() => removeFromWishList(item.productId)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm hover:bg-gray-100 z-10"
                >
                  <X className="h-3 w-3 text-gray-500" />
                </button>
                <div className="aspect-square overflow-hidden rounded-t-lg p-2">
                  <img
                    src={item.images[0].imagePath || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover w-full h-full rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div className="p-2 space-y-1">
                <div className="flex flex-col">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {item.title}
                  </h3>
                  <h5 className="font-normal text-sm line-clamp-1">
                    {item.description}
                  </h5>
                  <span className="text-sm line-through text-red-600">
                    ${item.price}/day
                  </span>
                  <span className="text-indigo-600 text-sm">
                    ${item.offerPrice}/day
                  </span>
                </div>

                <div>
                  <button
                    onClick={() => addToCart(item.productId)}
                    className="w-full bg-indigo-600 text-white px-3 py-2 text-sm rounded-md hover:bg-indigo-700 transition flex justify-center gap-1"
                    disabled={
                      loadingCart[item.productId] === "loading" ||
                      loadingCart[item.productId] === "success"
                    }
                  >
                    {loadingCart[item.productId] === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : loadingCart[item.productId] === "success" ? (
                      <>
                        {" "}
                        <BadgeCheck className="h-4 w-4 animate-checkmark" />{" "}
                        <span>Done</span>{" "}
                      </>
                    ) : (
                      <p>Add to Cart</p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
