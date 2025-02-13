"use client"
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import im from "../../../../../../public/Rentals/freepik__upload__70594.png"
import {OrderContext} from "../../../../Provider/OrderProvider"
const OrderSummary = ({selectedAddress,setSelectedAddress}) => {
  const [Product, setProduct] = useState()
  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };

  useEffect(() => {
    const selectedproduct  = JSON.parse(localStorage.getItem("selectedProduct"));
    setProduct(selectedproduct);
  }, [])
  
  
  return (
    <div className="p-4 w-full mx-auto border rounded-md shadow-lg bg-white mt-0">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {/* Address Section */}
      {selectedAddress ? (
        <div className="p-3 border rounded-md bg-gray-100 mb-4">
          <h3 className="text-lg font-semibold">Deliver To:</h3>
          <p className="text-gray-700">{selectedAddress.contactName}</p>
          <p className="text-gray-600">{selectedAddress.street}</p>
          <p className="text-gray-600">📞 {selectedAddress.contactNumber}</p>
        </div>
      ) : (
        <p className="text-red-500 mb-4">No address selected!</p>
      )}

      {/* Order Items Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Items Ordered</h3>
        {Product ?(
          Product?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2 w-full">
              <div className=" flex">
                <Image alt="image" width={50} height={50} src={im} className="rounded-lg"></Image>
                <div className="ml-4">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500">Qty: 2</p>
                </div>
              </div>
              <p className="font-semibold block float-right">₹</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in cart</p>
        )}
      </div>

      {/* Price Summary */}
      <div className="border-t pt-3">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal:</p>
          <p>₹</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Delivery Fee:</p>
          <p>₹{""}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <p>Total:</p>
          <p>₹{""}</p>
        </div>
      </div>
      <div className="flex">
      <button
        className="w-full ml-2 p-2 mt-4 bg-blue-600 text-white rounded-md"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
      </div>     
    </div>
  );
};

export default OrderSummary;
