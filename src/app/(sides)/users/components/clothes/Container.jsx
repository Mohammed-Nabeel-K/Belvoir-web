"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import ClothCards from "./ClothCards";
import { Menu, X, MoreVertical } from "lucide-react";
import { useFetchAllClothes } from "@/hooks/clothesHook";

function Container() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(false);

  const [Material, setMaterial] = useState([]);
  const [designPattern, setDesignPattern] = useState([]);
  const [pageNo, setPageNo] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const [minPrice,setMinPrice]=useState("");
  const [maxPrice,setMaxPrice]=useState("");
  const [Color,setColor]=useState([]);

  const pageSize = 10; 



  const pageSize = 4; 

  const { data, isLoading } = useFetchAllClothes(query,"price",sort,Material,Color,designPattern,minPrice,maxPrice,pageNo,pageSize);
  const [filteredData, setFilteredData] = useState([]);
  // console.log(Material)


  
  useEffect(() => {
    if (data?.data) {
  
      // console.log(data.data)
      if (pageNo === 1) {
        setFilteredData(data.data);
      } else {
      
        setFilteredData((prev) => [...prev, ...data.data]);
      }

     

      if (data.data.length < pageSize) {
        setHasMore(false); 
      }
    }
  }, [data, pageNo, pageSize,Material]);


 
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

     

      if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading && hasMore) {
        setPageNo((prev) => prev + 1); 
      }
    };


    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <main>
      <div className="container mx-auto my-4 px-2">
        <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg gap-4">
          <div className="flex items-center flex-grow sm:flex-none space-x-2">
            <button
              onClick={() => setFilterOpen(true)}
              className="md:hidden flex items-center justify-center bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              <MoreVertical size={24} />
            </button>

            {/* Search Bar */}
            <div className="flex flex-grow sm:flex-none rounded-full border-2 focus:border-4 border-black overflow-hidden w-full max-w-[280px] sm:max-w-md">
              <input
                type="text"
                value={query}
                placeholder="Search clothes..."
                className="w-full outline-none bg-white font-sans font-semibold placeholder-gray-600  text-sm px-3 py-2"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="flex items-center justify-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="fill-black"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:flex space-x-2 font-sans font-bold">
              <button
                onClick={() => setSort("false")}
                className="px-4 py-2 rounded-full  bg-slate-100  hover:bg-slate-300"
              >
                Price Ascending
              </button>
              <button
                onClick={() => setSort("true")}
                className="px-4 py-2 rounded-full bg-slate-100   hover:bg-slate-300"
              >
                Price Descending
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 z-50">
                <button
                  onClick={() => setSort(true)}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  Price Ascending
                </button>
                <button
                  onClick={() => setSort(false)}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  Price Descending
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="hidden md:block">
          <Filter setMaterial={setMaterial} Material={Material} setDesignPattern={setDesignPattern} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setColor={setColor} />
        </div>

        {filterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="w-3/4 sm:w-1/2 bg-white h-full p-4 shadow-lg transform translate-x-0 transition-transform">
              <button onClick={() => setFilterOpen(false)} className="absolute top-4 right-4">
                <X size={24} />
              </button>
              <Filter setMaterial={setMaterial} Material={Material} setDesignPattern={setDesignPattern} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setColor={setColor} />

            </div>
          </div>
        )}

        <ClothCards isLoading={isLoading} filteredData={filteredData} />
        
      </div>
      <div>
      {/* {isLoading && <div className="text-center py-4">Loading more clothes...</div>}
      {!hasMore && <div className="text-center py-4">No more clothes to load.</div>} */}
      </div>
    </main>
  );
}

export default Container;