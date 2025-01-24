import React from "react";
import { FaDollarSign, FaShoppingCart, FaBox, FaUserPlus } from "react-icons/fa"; // Icons

const OverView = () => {
  return (
    <div className="h-full  p-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 h-full">
        
        <div className="flex flex-col items-start justify-center h-full p-6 bg-green-100 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="p-4 rounded-full bg-green-200 text-green-800">
            <FaDollarSign size={32} />
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-green-600">Total Received</p>
            <p className="text-2xl font-bold text-green-900">$12,345</p>
          </div>
        </div>

        
        <div className="flex flex-col items-start justify-center h-full p-6 bg-blue-100 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="p-4 rounded-full bg-blue-200 text-blue-800">
            <FaShoppingCart size={32} />
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-blue-600">Total Orders</p>
            <p className="text-2xl font-bold text-blue-900">12</p>
          </div>
        </div>

    
        <div className="flex flex-col items-start justify-center h-full p-6 bg-yellow-100 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="p-4 rounded-full bg-yellow-200 text-yellow-800">
            <FaBox size={32} />
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-yellow-600">Delivered</p>
            <p className="text-2xl font-bold text-yellow-900">12</p>
          </div>
        </div>

    
        <div className="flex flex-col items-start justify-center h-full p-6 bg-purple-100 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <div className="p-4 rounded-full bg-purple-200 text-purple-800">
            <FaUserPlus size={32} />
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-purple-600">Pending</p>
            <p className="text-2xl font-bold text-purple-900">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
