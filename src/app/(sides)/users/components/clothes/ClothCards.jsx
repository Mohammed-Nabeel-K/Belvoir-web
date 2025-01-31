// "use client";
// import React from "react";
// import { useFetchClothesWithoutQuery } from "../../../../../hooks/clothesHook";
// import Link from "next/link";

// const ClothCards = () => {
//   const { data, isLoading } = useFetchClothesWithoutQuery();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center mt-[100px] ml-[500px] h-screen">
//         <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
//       {data?.data?.map((item) => (
//         <div
//           key={item.id}
//           className="p-4 bg-gray-100 shadow-sm flex flex-col rounded-lg"
//         >
//           {/* Image and Title */}
//           <div className="overflow-hidden flex justify-center">
//             <img
//               className="object-cover duration-150 transition-all hover:scale-110 h-[250px] w-[250px] rounded-lg"
//               src={item.imageUrl}
//               alt={item.title}
//             />
//           </div>

//           <div className="flex flex-col gap-2 mt-5 px-4">
//             <div className="font-bold text-gray-600 text-lg">{item.title}</div>

//             {/* Price and View Button */}
//             <div className="flex items-center justify-between">
//               <div className="text-gray-900 font-bold">Price: ₹{item.price}</div>
//               <Link href={`/users/clothes/${item.id}`}>
//                 <button className="bg-black text-white rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition">
//                   View
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClothCards;

"use client";
import React, { useState, useEffect } from "react";
import { useFetchClothesWithoutQuery } from "../../../../../hooks/clothesHook";
import Link from "next/link";

const ClothCards = ({ sortType, query }) => {
  const { data, isLoading } = useFetchClothesWithoutQuery();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.data) {
      let filteredClothes = [...data.data];

      if (query) {
        filteredClothes = filteredClothes.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (sortType === "asc") {
        filteredClothes.sort((a, b) => a.price - b.price);
      } else if (sortType === "desc") {
        filteredClothes.sort((a, b) => b.price - a.price);
      } else if (sortType === "rating") {
        filteredClothes.sort((a, b) => b.rating - a.rating);
      }

      setFilteredData(filteredClothes);
    }
  }, [data, sortType, query]); 
  if (isLoading) {
    return (
      <div className="flex justify-center mx-auto mt-[100px] h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-100 shadow-sm flex flex-col rounded-lg"
          >
            {/* Image and Title */}
            <div className="overflow-hidden flex justify-center">
              <img
                className="object-cover duration-150 transition-all hover:scale-110 h-[250px] w-[250px] rounded-lg"
                src={item.imageUrl}
                alt={item.title}
              />
            </div>

            <div className="flex flex-col gap-2 mt-5 px-4">
              <div className="font-bold text-gray-600 text-lg">{item.title}</div>

              {/* Price and View Button */}
              <div className="flex items-center justify-between">
                <div className="text-gray-900 font-bold">Price: ₹{item.price}</div>
                <Link href={`/users/clothes/${item.id}`}>
                  <button className="bg-black text-white rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center col-span-full text-gray-500 text-xl">
          No items found.
        </div>
      )}
    </div>
  );
};

export default ClothCards;
