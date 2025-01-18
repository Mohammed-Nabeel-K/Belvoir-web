"use client";

import React, { useState,useEffect } from "react";
import { useAddLaundryShops, useBlockOrUnblockLaundryShops, useDeleteLaundryShop, useFetchAllLaundryShops } from "../../../../../hooks/laundryHook";

const LaundryList = () => {
  const [page,setPage]=useState(1);
  const[limit,setLimit]=useState(3)
  const [searchQuery, setSearchQuery] = useState("");
   const [selectedShop, setSelectedShop] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShop, setNewShop] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      refetch();
      
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop((prev) => ({ ...prev, [name]: value }));
  };
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };


  const handleBlock=(id)=>{
    blockOrUnblockLaundryShops(id, {
      onSuccess: (data) => {
        refetch(); 
        console.log("success")
      },
      onError: (error) => {
        console.log("Error:", error);
      },
    });
  }
  
  useEffect(() => {
      refetch();
    }, [page, searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("New Shop Data:", newShop);
    addLaundryShops(newShop, {
      onSuccess: () => {
        setIsModalOpen(false);
     setNewShop({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
        refetch(); // Refetch tailors list
      },
      onError: (error) => {
        console.log("Error:", error);
      },
    });
  
    
  };

  const {data:laundryShops=[],refetch}=useFetchAllLaundryShops(limit,page,searchQuery,"");
  const {mutate:blockOrUnblockLaundryShops}=useBlockOrUnblockLaundryShops();
  const {mutate:addLaundryShops}=useAddLaundryShops();
  const {mutate:deleteLaundryShop}=useDeleteLaundryShop()

  const totalShops = laundryShops?.data?.count.usercount;
  const totalPages=Math.ceil(totalShops/limit)
  const blockedShops =laundryShops?.data?.count.blockedusercount;
  const activeShops = laundryShops?.data?.count.activeusercount;

  
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Laundry Shop List</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search for laundry shops..."
              value={searchQuery}
              onKeyDown={handleSearchEnter}
              onChange={handleSearch}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              + Add New Shop
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-800">Total Shops</h3>
            <p className="text-3xl font-semibold text-gray-900">{totalShops}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-800">Blocked Shops</h3>
            <p className="text-3xl font-semibold text-red-700">{blockedShops}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-800">Active Shops</h3>
            <p className="text-3xl font-semibold text-green-700">{activeShops}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white p-8 rounded-lg shadow-lg">
          <table className="min-w-full text-gray-700 border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left border border-gray-300">Si No</th>
                <th className="px-6 py-3 text-left border border-gray-300">Shop Name</th>
                <th className="px-6 py-3 text-left border border-gray-300">Email</th>
                <th className="px-6 py-3 text-left border border-gray-300">Phone Number</th>
                <th className="px-6 py-3 text-center border border-gray-300">block</th>
                <th className="px-6 py-3 text-center border border-gray-300">delete</th>
              </tr>
            </thead>
            <tbody>
              {laundryShops?.data?.data?.map((shop, index) => (
                <tr
                  key={shop.id}
                  onClick={()=>setSelectedShop(shop)}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-3 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border border-gray-300">{shop.name}</td>
                  <td className="px-6 py-3 border border-gray-300">{shop.email}</td>
                  <td className="px-6 py-3 border border-gray-300">{shop.phone}</td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    <button
                      className={`px-4 py-2 rounded-lg text-white shadow-md ${
                        shop.isBlocked
                          ? "bg-yellow-600 hover:bg-red-800"
                          : "bg-green-700 hover:bg-green-800"
                      }`}
                      onClick={(e)=>{
                        e.stopPropagation();
                        handleBlock(shop.id)}}
                    >
                      {shop.isBlocked ? "Unblock" : "Block"}
                    </button>
                    
                  </td>
                  <td className="px-6 py-3 text-center border border-gray-300">
                    <button className="px-4 py-2 rounded-lg text-white shadow-md bg-black" 
                    onClick={(e)=>{

                       e.stopPropagation();
                      deleteLaundryShop(shop.id)}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {/* Pagination Controls */}
       <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
          >
            Next
          </button>
        </div>

      {/* Modal for Adding New Shop */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Shop</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium">Shop Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newShop.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newShop.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={newShop.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={newShop.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Add Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedShop && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Shop Details
              </h2>
              <div className="space-y-2">
                <p>
                <strong>ID:</strong> {selectedShop.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedShop.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedShop.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedShop.phone}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={()=>setSelectedShop(null)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default LaundryList;
