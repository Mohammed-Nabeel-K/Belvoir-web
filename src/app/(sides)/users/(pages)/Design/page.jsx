"use client";

import React, { useState } from "react";

import Footer from "../../components/ui/footer/Footer";
import { Menu, X } from "lucide-react";
import { useFetchDesignWithoutQuery } from "../../../../../hooks/designHook";
import Link from "next/link";
import Sidebar from "../../components/Design/SidebarFilter";

function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useFetchDesignWithoutQuery();

  return (
    <main className="min-h-screen bg-white ">
      <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg gap-4">
        <div className="sm:ml-5">
          <div className="flex flex-grow sm:flex-none rounded-3xl border-2 border-gray-500 overflow-hidden w-full max-w-[280px] sm:max-w-md">
            <input
              type="text"
              placeholder="Search Something..."
              className="w-full outline-none bg-white text-gray-600 text-sm px-3 py-2"
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
        <div>
          <div className="relative">
            <div className="hidden md:flex space-x-2 font-sans">
              <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
                Price Ascending
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
                Price Descending
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
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
                <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">
                  Price Ascending
                </button>
                <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">
                  Price Descending
                </button>
                <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">
                  Rating
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex min-h-screen  p-6">
        <div>
          <Sidebar />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ml-10 sm:ml-0">
          {data?.data?.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-gray-100 h-[350px]  flex  flex-col rounded-sm shadow-sm"
            >
              <div className="overflow-hidden flex justify-center">
                <img
                  className="object-cover duration-150 transition-all hover:scale-110 h-[250px] w-[250px] rounded-lg"
                  src={item.images[0].imageUrl}
                  alt={item.name}
                />
              </div>

              <div className="flex flex-col gap-2 mt-5 px-4">
                <div className="font-bold text-gray-600 text-lg">
                  {item.name}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-900 font-bold">
                    Price: ₹{item.price}
                  </div>
                  <Link href={`/users/Design/${item.id}`}>
                    <button className="bg-black text-white rounded-2xl px-4 py-1 hover:bg-white hover:text-black border transition">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </main>
  );
}

export default Page;
