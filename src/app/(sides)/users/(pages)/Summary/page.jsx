"use client";
import React from "react";
import Link from "next/link";

const OrderSummary = () => {
  const selectedCloth = {
    imageUrl: "https://via.placeholder.com/150",
    title: "Blue Denim Shirt",
    price: 1200,
  };

  const selectedDesign = {
    title: "Slim Fit",
    price: 150,
  };

  const selectedMeasurements = {
    length: "40 inches",
    chest: "38 inches",
    sleeveLength: "24 inches",
    type: "Shirt",
  };

  const clothPrice = selectedCloth.price;
  const designPrice = selectedDesign.price;
  const totalPrice = clothPrice + designPrice;

  return (
    <div className="font-sans">
      <div className="p-6 max-w-4xl mx-auto bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Order Summary
        </h2>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedCloth.imageUrl}
                alt={selectedCloth.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium text-gray-700">{selectedCloth.title}</h3>
                <p className="text-gray-500">Price: ₹{selectedCloth.price}</p>
              </div>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" /> 
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="font-medium text-gray-700">Design: {selectedDesign.title}</h3>
          <p className="text-gray-500">Price: ₹{selectedDesign.price}</p>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="font-medium text-gray-700">Measurements</h3>
          <ul className="text-gray-500">
            <li>Length: {selectedMeasurements.length}</li>
            <li>Chest: {selectedMeasurements.chest}</li>
            <li>Sleeve Length: {selectedMeasurements.sleeveLength}</li>
            <li>Type: {selectedMeasurements.type}</li>
          </ul>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="font-medium text-gray-700">Price Details</h3>
          <div className="flex justify-between mt-4">
            <p className="text-gray-500">Cloth Price</p>
            <p className="text-gray-800">₹{clothPrice}</p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-gray-500">Design Price</p>
            <p className="text-gray-800">₹{designPrice}</p>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex justify-between mt-4 font-semibold">
            <p>Total Price</p>
            <p className="text-gray-800">₹{totalPrice}</p>
          </div>
        </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200 py-4 px-6 flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold text-gray-800">Total: ₹{totalPrice}</p>
        </div>
        <div className="flex gap-4">
          <Link href="/users/Payment">
            <button className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-green-700 transition-all">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>
      </div>

     
    </div>
  );
};

export default OrderSummary;
