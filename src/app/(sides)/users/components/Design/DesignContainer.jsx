
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Sidebar from "../../components/Design/SidebarFilter";
import { useFetchAllDesigns } from "../../../../../hooks/designHook";
import LoadingUi from "../ui/loading/loadingui";

const DesignContainer = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(false);
  const [designType, setDesignType] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredData, setFilteredData] = useState([]);
 const[pageSize,setpageSize]=useState(10)

  const { data, isLoading } = useFetchAllDesigns(
    query,
    designType,
    minPrice,
    maxPrice,
    "price",
    sort,
    pageNo,
    pageSize
  );

  const fetchingRef = useRef(false); // Prevents multiple API calls

  useEffect(() => {
    if (data?.data) {
      if (pageNo === 1) {
        setFilteredData(data.data);
      } else {
        setFilteredData((prev) => [...prev, ...data.data]);
      }

      setHasMore(data.data.length === pageSize); // Disable infinite scroll if less than pageSize
      fetchingRef.current = false; // Mark fetching as done
    }
  }, [data, pageNo, pageSize]);

  useEffect(() => {
    setPageNo(1);
    setHasMore(true); // Reset pagination on filter change
  }, [query, designType, minPrice, maxPrice, sort]);

  useEffect(() => {
    const handleScroll = () => {
      if (fetchingRef.current || isLoading || !hasMore) return; // Prevent duplicate calls

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchingRef.current = true; // Mark fetching as in progress
        setPageNo((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div className="min-h-screen p-6">
      <div className="flex ">
<div className="flex flex-col">
      <div className="hidden sm:flex flex-wrap items-center justify-center w-[280px] bg-white p-4 rounded-lg gap-4">
            <div className="relative w-full max-w-[280px] sm:max-w-md">
              <div className="flex flex-grow sm:flex-none rounded-full border-2 focus:border-4 border-black overflow-hidden w-full">
                <input
                  type="text"
                  placeholder="Search clothes..."
                  className="w-full outline-none bg-white font-sans placeholder-gray-600 text-sm px-3 py-2"
                  value={query}
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
          </div>
        <Sidebar setSort={setSort} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} setDesignType={setDesignType} />
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.id} className="p-4 bg-gray-100 h-[350px] flex flex-col rounded-sm shadow-sm">
                  <div className="overflow-hidden flex justify-center">
                    <img
                      className="object-cover duration-150 transition-all hover:scale-110 h-[250px] w-[250px] rounded-lg"
                      src={item.images[0].imageUrl}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-5 px-4">
                    <div className="font-bold text-gray-600 text-lg">{item.name}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-900 font-bold">Price: ₹{item.price}</div>
                      <Link href={`/users/Design/${item.id}`}>
                        <button className="bg-black text-white rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full text-gray-500 text-xl">No items found.</div>
            )}
          </div>

          {isLoading && hasMore && (
            <div className="flex justify-center mx-auto mt-6">
              <LoadingUi/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignContainer;

