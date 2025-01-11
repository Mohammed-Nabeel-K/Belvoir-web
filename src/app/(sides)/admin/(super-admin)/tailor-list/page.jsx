'use client'

import React, { useState } from 'react';
import { useBlockOrUnblockTailor, useFetchAllTailors } from '../../../../../hooks/tailorsHook';

const TailorListPage = () => {
 

  const [searchQuery, setSearchQuery] = useState('');

  const {data:tailors=[],isLoading,isError,error}=useFetchAllTailors();
  const { mutate: tailorBlockOrUnblock}=useBlockOrUnblockTailor();

  const toggleStatus = (id) => {
   console.log("working",id);
   tailorBlockOrUnblock(id,{
    onSuccess:(data)=>{
      console.log(data)
    },onError:(error)=>{
      console.log(error)
    }
   })

  };



  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Tailor List</h1>

          <div className="flex items-center gap-4">
            
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search tailors..."
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
              + Add Tailor
            </button>
          </div>
        </div>

      
        <div className="flex justify-between gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Total Tailors</h3>
            <p className="text-3xl font-semibold text-gray-900">{tailors.data?.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Active Tailors</h3>
            <p className="text-3xl font-semibold text-green-500">{tailors.data?.filter(item=>!item.isBlocked).length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Blocked Tailors</h3>
            <p className="text-3xl font-semibold text-red-500">{tailors.data?.filter(item=>item.isBlocked).length}</p>
          </div>
        </div>

      
        <div className="overflow-x-auto bg-white p-8 rounded-2xl shadow-2xl">
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-left text-lg font-semibold">Si No.</th>
                <th className="py-3 px-6 text-left text-lg font-semibold">Tailor Name</th>
                <th className="py-3 px-6 text-left text-lg font-semibold">Email</th>
                <th className="py-3 px-6 text-left text-lg font-semibold">Phone Number</th>
                <th className="py-3 px-6 text-center text-lg font-semibold">Block</th>
                <th className="py-3 px-6 text-center text-lg font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tailors.data?.filter(tailor => tailor.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((tailor, index) => (
                  <tr key={tailor.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-800">{tailor.name}</td>
                    <td className="py-3 px-6 text-gray-600">{tailor.email}</td>
                    <td className="py-3 px-6 text-gray-600">{tailor.phone}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => toggleStatus(tailor.id)}
                        className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                      >
                        {tailor.isBlocked? 'Activate':'Block'}
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => deleteTailor(tailor.id)}
                        className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TailorListPage;
