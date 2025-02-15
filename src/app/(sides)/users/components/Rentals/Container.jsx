"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Filter from "./Filter";
import RentalCards from "./RentalCards";
import { MoreVertical, X } from "lucide-react";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { UsefetchAllRentalProducts } from "@/hooks/rentalProductsHoook";

function Container() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchdata, setsearchdata] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pagenumber, setpagenumber] = useState(1);
  const [filterdata, setfilterdata] = useState({
    gender: "",
    garmenttype: "",
    fabrictype: "",
  });
  const [Data, setData] = useState();
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 1;

  const { data, isLoading } = UsefetchAllRentalProducts(
    pagenumber,
    pageSize,
    filterdata.gender,
    filterdata.fabrictype,
    filterdata.garmenttype,
    searchdata,
    minPrice,
    maxPrice
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = filterOpen ? "hidden" : "scroll";
    }
  }, [filterOpen]);  
  useEffect(() => {
   
    setpagenumber(1);
    setHasMore(true);
  }, [filterdata, searchdata, minPrice, maxPrice]);

  useEffect(() => {
    if (data?.data) {
      if (pagenumber === 1) {
        setData(data.data);
      } else {
        setData((prev) => [...prev, ...data.data]);
        console.log(pagenumber);
        console.log(Data);
      }
      if (data.data.length < pageSize) {
        setHasMore(false);
      }
    }
  }, [data, pagenumber, pageSize]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        !isLoading &&
        hasMore
      ) {
        setpagenumber((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <main>
      <div className="mx-auto my-4 px-2">
        <div className="flex flex-wrap items-center justify-end bg-white p-4 rounded-lg gap-4">
          <div className="flex items-center flex-grow sm:flex-none space-x-2">
            <button
              onClick={() => setFilterOpen(true)}
              className="md:hidden lg:hidden flex items-center justify-center bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              <MoreVertical size={24} />
            </button>

            {/* Search Bar */}
            <div className="flex flex-grow sm:flex-none rounded-3xl border-2 border-gray-500 overflow-hidden w-full max-w-[280px] sm:max-w-md">
              <input
                type="text"
                value={searchdata || " "}
                placeholder="Search Something..."
                className="w-full outline-none bg-white text-black text-sm px-3 py-2"
                onChange={(e) => setsearchdata(e.target.value)}
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
        </div>
      </div>

      <div className="flex">
        <div className="hidden md:block">
          <Filter
            setfilterdata={setfilterdata}
            filterdata={filterdata}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            minprice={minPrice}
            maxprice={maxPrice}
          />
        </div>
        {filterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end h-[100vh]  ">
            <div className="w-3/4 sm:w-1/2 bg-white h-full p-4 transform translate-x-0 transition-transform overflow-y-scroll">
              <button
                onClick={() => setFilterOpen(false)}
                className="absolute top-4 right-4 cursor-pointer"
              >
                <X size={24} className="cursor-pointer"/>
              </button>
              <Filter
                isLoading={isLoading}
                setfilterdata={setfilterdata}
                filterdata={filterdata}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                minprice={minPrice}
                maxprice={maxPrice}
              />
            </div>
          </div>
        )}
        <RentalCards data={Data} isLoading={isLoading} />
      </div>
    </main>
  );
}

export default Container;
