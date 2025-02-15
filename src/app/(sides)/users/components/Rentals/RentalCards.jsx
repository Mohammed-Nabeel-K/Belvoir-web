"use client";
import React from "react";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
const RentalCards = ({ data, isLoading }) => {
  const rounter = useRouter();
  const addToCart = async (item) => {
    const token = localStorage.getItem("userData");

    try {
      const response = await axiosInstance.post(
        "/RentalCart/AddToCart",
        {
          productId: item.id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 200) {
        toast.success("item added to cart successfully");
      }
      return response.data;
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("please login");
        rounter.push("/login")
      }
      console.error("cart", error);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  px-3">
      {data ? (
        data.map((item) => (
          <Link href={`/users/rental/${item.id}`}>
            <div
              key={item.id}
              className="p-4 bg-gray-100  flex flex-col rounded-lg mx-1 h-max shadow-custom hover:shadow-none"
            >
              {/* Image and Title */}
              <div className="overflow-hidden flex justify-center">
                <img
                  className="object-cover duration-150 transition-all hover:scale-110 h-[180px] w-[250px] rounded-lg"
                  src={item?.images.find((image) => image.isPrimary)?.imagePath}
                />
              </div>

              <div className="flex flex-col gap-2 mt-5 ">
                <div className=" text-gray-600 text-[15px] line-clamp-3 overflow-hidden">
                  {item.title}
                </div>

                {/* Price and View Button */}
                <div className="flex items-center justify-between">
                  <button
                    className="bg-black text-white rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition text-[10px]"
                    onClick={() => addToCart(item)}
                  >
                    Add To Cart
                    </button>

                <div className="text-gray-900 font-bold text-[12px]">₹{item.offerPrice}</div>
                <Link href={`/users/rentals/${item.id}`}>
                  <button className="bg-black text-white rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition text-[10px]">
                    View

                  </button>
                  </Link>
                

                  <div className="text-gray-900 font-bold text-[12px]">
                    ₹{item.offerPrice}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center col-span-full text-gray-500 text-xl">
          No items found.
        </div>
      )}
    </div>
    
  );
};

export default RentalCards;
