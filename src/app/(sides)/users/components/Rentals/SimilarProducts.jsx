
"use client";
import React from "react";
import Link from "next/link";

const SimilarProducts = ({data}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-6">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
        {data?.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-200 shadow-sm flex flex-col rounded-lg hover:shadow-md transition-all"
              >
              <div className="overflow-hidden flex justify-center">
                <img
                  className="object-cover duration-150 transition-all hover:scale-110 h-[180px] w-[250px] rounded-lg object-left-top"
                  src={item?.images?.find((x)=>x.isPrimary)?.imagePath}
                />
              </div>

              <div className="flex flex-col gap-2 mt-4 ">
                <div className="font-bold text-gray-600 text-sm sm:text-[14px]">
                  {item.title}
                </div>

                <div className="flex items-center justify-between text-sm sm:text-base">
                  <div className="text-gray-900 font-bold">₹{item.price}</div>
                  <Link href={`/users/Rentals/${item.id}`}>
                    <button className="bg-black text-white text-[10px] rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
