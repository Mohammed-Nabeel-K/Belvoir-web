"use client"
import React, { useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import im from "../../../../../../public/Rentals/freepik__upload__70594.png"
const OrderSummary = ({selectedAddress,setSelectedAddress,handleBack}) => {
  // Hardcoded address
  
  // Hardcoded cart items
  const cartItems = [
    { id: 1, name: "Wireless Earbuds", price: 1500, quantity: 2 },
    { id: 2, name: "Smartwatch", price: 3000, quantity: 1 },
  ];

  const deliveryFee = 50; // Example delivery charge
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };
  useEffect(() => {
    const storedAddress = localStorage.getItem("selectedAddress");
    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }  }, [])
  
  return (
    <div className="p-4 max-w-xl mx-auto border rounded-md shadow-lg bg-white">
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
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2 w-full">
              <div className=" flex">
                <Image alt="image" width={50} height={50} src={im} className="rounded-lg"></Image>
                <div className="ml-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold block float-right">₹{item.price * item.quantity}</p>
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
          <p>₹{subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Delivery Fee:</p>
          <p>₹{deliveryFee}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <p>Total:</p>
          <p>₹{totalAmount}</p>
        </div>
      </div>
      <div className="flex">
      <button
        className="w-full mr-2 p-2 mt-4 bg-red-600 text-white rounded-md"
        onClick={handleBack}
      >
        Back
      </button>
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
