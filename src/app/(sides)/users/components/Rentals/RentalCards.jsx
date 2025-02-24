"use client";
import React, { useState } from "react";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { Heart, ShoppingCart, BadgeCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
const RentalCards = ({ data, isLoading }) => {
  const [loadingCart, setLoadingCart] = useState({});
  const [loadingWish, setLoadingWish] = useState({});
  const rounter = useRouter();

  const addToCart = async (item) => {
    setLoadingCart((prev) => ({ ...prev, [item.id]: "loading" }));

    const token = localStorage.getItem("userData");
    try {
      await axiosInstance.post(
        "/RentalCart/AddToCart",
        {
          productId: item.id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoadingCart((prev) => ({ ...prev, [item.id]: "success" }));
    } catch (error) {
      console.error("cart", error);
      setLoadingCart((prev) => ({ ...prev, [item.id]: null }));
    }
  };

  const addToWishList = async (item) => {
    setLoadingWish((prev) => ({ ...prev, [item.id]: "loading" }));


    const token = localStorage.getItem("userData");
    try {
      await axiosInstance.post(
        `/Rental/whishlist?productid=${item.id}`, // Updated endpoint with query parameter
        {}, // Empty body since productid is in query params
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoadingWish((prev) => ({ ...prev, [item.id]: "success" }));
    } catch (error) {
      console.error("wish", error);
      setLoadingWish((prev) => ({ ...prev, [item.id]: null }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mx-auto mt-[100px] h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data ? (
          data.map((item, i) => {
            const cartState = loadingCart[item.id];
            const wishState = loadingWish[item.id];
            return (
              <Link href={`/users/rental/${item.id}`} key={i}>
                <div
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all w-full max-w-[300px] border"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-lg p-2">
                      <img
                        src={
                          item?.images.find((image) => image.isPrimary)
                            ?.imagePath || "/placeholder.svg"
                        }
                        alt={item.title}
                        className="object-cover w-full h-full rounded-md shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-2 space-y-1">
                    <div className="flex flex-col">
                      <h3 className="font-medium text-sm line-clamp-1">
                        {item.title}
                      </h3>
                      <span className="text-[#0E0E25] text-sm">
                        ₹{item.offerPrice}/day
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex-1 bg-[#0E0E25] text-white px-3 py-2 text-sm rounded-md  transition flex items-center justify-center gap-1"
                        disabled={cartState === "loading"}
                      >
                        {cartState === "success" ? (
                          <>
                            <BadgeCheck className="h-4 w-4 animate-checkmark" />
                            <span>Done</span>
                          </>
                        ) : cartState === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4" />
                            <span>Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => addToWishList(item)}
                        className="flex-1 border border-indigo-600 text-indigo-600 px-3 py-2 text-sm rounded-md hover:bg-indigo-50 transition flex items-center justify-center gap-1"
                        disabled={wishState === "loading"}
                      >
                        {wishState === "success" ? (
                          <>
                            <BadgeCheck className="h-4 w-4 animate-checkmark" />
                            <span>Done</span>
                          </>
                        ) : wishState === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Heart className="h-4 w-4" />
                            <span>Wishlist</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center col-span-full text-gray-500 text-xl">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalCards;
