'use client'

import React, { useState } from 'react';

const DeliveryBoyListPage = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([
    { id: 1, name: 'John Delivery', email: 'john@example.com', phone: '+1234567890', status: 'active' },
    { id: 2, name: 'Jane Runner', email: 'jane@example.com', phone: '+0987654321', status: 'blocked' },
    { id: 3, name: 'Robert Rider', email: 'robert@example.com', phone: '+1122334455', status: 'active' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const totalDeliveryBoys = deliveryBoys.length;
  const activeDeliveryBoys = deliveryBoys.filter(deliveryBoy => deliveryBoy.status === 'active').length;
  const blockedDeliveryBoys = deliveryBoys.filter(deliveryBoy => deliveryBoy.status === 'blocked').length;

  const toggleStatus = (id) => {
    setDeliveryBoys(deliveryBoys.map(deliveryBoy =>
      deliveryBoy.id === id ? { ...deliveryBoy, status: deliveryBoy.status === 'active' ? 'blocked' : 'active' } : deliveryBoy
    ));
  };

  const deleteDeliveryBoy = (id) => {
    setDeliveryBoys(deliveryBoys.filter(deliveryBoy => deliveryBoy.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
      
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Delivery Boy List</h1>

          <div className="flex items-center gap-4">
          
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search delivery boys..."
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
              + Add Delivery Boy
            </button>
          </div>
        </div>

      
        <div className="flex justify-between gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Total Delivery Boys</h3>
            <p className="text-3xl font-semibold text-gray-900">{totalDeliveryBoys}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Active</h3>
            <p className="text-3xl font-semibold text-green-500">{activeDeliveryBoys}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">Blocked</h3>
            <p className="text-3xl font-semibold text-red-500">{blockedDeliveryBoys}</p>
          </div>
        </div>


        <div className="overflow-x-auto bg-white p-8 rounded-2xl shadow-2xl">
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-left text-lg font-semibold">Si No.</th>
                <th className="py-3 px-6 text-left text-lg font-semibold">Name</th>
                <th className="py-3 px-6 text-left text-lg font-semibold">Email</th>
                <th className="py-3 px-6 text-left text-lg font-semibold">Phone Number</th>
                <th className="py-3 px-6 text-center text-lg font-semibold">Block</th>
                <th className="py-3 px-6 text-center text-lg font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {deliveryBoys
                .filter(deliveryBoy => deliveryBoy.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((deliveryBoy, index) => (
                  <tr key={deliveryBoy.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-800">{deliveryBoy.name}</td>
                    <td className="py-3 px-6 text-gray-600">{deliveryBoy.email}</td>
                    <td className="py-3 px-6 text-gray-600">{deliveryBoy.phone}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => toggleStatus(deliveryBoy.id)}
                        className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-opacity-80 transition-all duration-300 shadow-lg transform hover:scale-105"
                      >
                        {deliveryBoy.status === 'active' ? 'Block' : 'Activate'}
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => deleteDeliveryBoy(deliveryBoy.id)}
                        className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-opacity-80 transition-all duration-300 shadow-lg transform hover:scale-105"
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

export default DeliveryBoyListPage;
