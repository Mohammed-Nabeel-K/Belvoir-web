"use client";
import React, { useState } from "react";
import Filter from "./Filter";
import ClothCards from "./ClothCards";
import { Menu, X, MoreVertical } from "lucide-react";

function Container() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortType, setSortType] = useState(""); 
  const [query,setQuery]=useState("");

  const handleSort = (type) => {
    setSortType(type);
    setMenuOpen(false); 
  };

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
            <div className="flex flex-grow sm:flex-none rounded-3xl border-2 border-gray-500 overflow-hidden w-full max-w-[280px] sm:max-w-md">
              <input
                type="text"
                value={query}
                placeholder="Search Something..."
                className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2"
                onChange={(e)=>setQuery(e.target.value)}
              />
              <button className="flex items-center justify-center bg-black px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192.904 192.904"
                  width="16px"
                  className="fill-white"
                >
                  <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => handleSort("asc")}
                className={`px-4 py-2 rounded-full ${
                  sortType === "asc" ? "bg-gray-400 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Price Ascending
              </button>
              <button
                onClick={() => handleSort("desc")}
                className={`px-4 py-2 rounded-full ${
                  sortType === "desc" ? "bg-gray-400 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Price Descending
              </button>
              <button
                onClick={() => handleSort("rating")}
                className={`px-4 py-2 rounded-full ${
                  sortType === "rating" ? "bg-gray-400 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Rating
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
                  onClick={() => handleSort("asc")}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  Price Ascending
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  Price Descending
                </button>
                <button
                  onClick={() => handleSort("rating")}
                  className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  Rating
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="hidden md:block">
          <Filter />
        </div>

        {filterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="w-3/4 sm:w-1/2 bg-white h-full p-4 shadow-lg transform translate-x-0 transition-transform">
              <button onClick={() => setFilterOpen(false)} className="absolute top-4 right-4">
                <X size={24} />
              </button>
              <Filter />
            </div>
          </div>
        )}

        <ClothCards sortType={sortType}  query={query}/>
      </div>
    </main>
  );
}

export default Container;
