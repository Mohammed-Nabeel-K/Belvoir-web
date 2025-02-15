"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import loadRazorpay from "../../../../../../utils/LoadRazorpay";
import { useRouter } from "next/navigation";

const OrderSummaryTailoring = ({ selectedAddress }) => {
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedMeasurements, setSelectedMeasurements] = useState(null);
  const [productId, setProductId] = useState(null);
  const router = useRouter();

  

useEffect(() => {
  setSelectedCloth(JSON.parse(localStorage.getItem("selectedCloth")) || {});
  setSelectedDesign(JSON.parse(localStorage.getItem("selectedDesign")) || {});
  setSelectedMeasurements(JSON.parse(localStorage.getItem("selectedMeasurements")) || {});
  
 
  setProductId(localStorage.getItem("tailorProductId"));
}, []);


  if (!selectedCloth || !selectedDesign || !selectedMeasurements) {
    return <p className="text-center text-gray-500">Loading order details...</p>;
  }

  const clothPrice = selectedCloth.price || 0;
  const designPrice = selectedDesign.price || 0;
  const totalPrice = clothPrice + designPrice;

  

  const handlePayment = async (totalAmount) => {
    try {
      const response = await axiosInstance.post(
        "/payment/create-order",
        {},
        {
          params: { amount: totalAmount },
          headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
        }
      );
  
      if (!response.data) {
        toast.error("Failed to create order. Please try again.");
        return;
      }
      if(response){
  
      const res = await loadRazorpay();
      if (!res) {
        toast.error("Failed to load Razorpay. Please try again.");
        return;
      }
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: response.data.amount * 100, 
        currency: "INR",
        name: "Belvoir",
        description: "Order Payment",
        order_id: response.data.orderId,
        handler: async (response) => {
          toast.success("Payment Successful!")
          try {
            // Step 4: Verify the payment with backend
            const verify = await axiosInstance.post(
              "/payment/verify-payment",
              {
                paymentId: response?.razorpay_payment_id,
                orderId: response?.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
              }
            );

            
  
            if (verify.status === 200) {
              router.push("/users/order-completed");
          
            }
          } catch (error) {
            toast.error("Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();}
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
    }
  };
  const handlePlaceOrder = async () => {
    try {
      const response = await axiosInstance.post(
        "/Order/PlaceOrder",
        {
          paymentMethod: "RazorPay",
          shippingAddress: selectedAddress.id,
          fastShipping: false,
          productType: "tailor",
          productId: productId,
          quantity: 1,
          price: totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
        }
      );

      if (response.status === 200) {
        toast.success("Order Created. Redirecting to Payment...");
        handlePayment(totalPrice);
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

 

  return (
    <div className="font-sans min-h-screen bg-cover bg-center relative" >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 p-6 max-w-4xl mx-auto bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Order Summary</h2>


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


        {/* Cloth Details */}
        <Link href={`/users/clothes/${selectedCloth.id}`}>
          <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-4">
              <img src={selectedCloth.imageUrl} alt={selectedCloth.title} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h3 className="font-medium text-gray-700">{selectedCloth.title}</h3>
                <p className="text-gray-500">Price: ₹{clothPrice}</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Design Details */}
        <Link href={`/users/clothes/${selectedDesign.id}`}>
          <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-4">
              <img src={selectedDesign.images[0].imageUrl} alt={selectedDesign.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h3 className="font-medium text-gray-700">{selectedDesign.name}</h3>
                <p className="text-gray-500">Price: ₹{designPrice}</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Measurements */}
        <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6">
          <h3 className="font-medium text-gray-700">Measurements</h3>
          {selectedMeasurements?.values?.length > 0 ? (
            <ul className="text-gray-500">
              {selectedMeasurements.values.map((m, index) => (
                <li key={index} className="mt-2">
                  <span className="font-semibold text-gray-700">{m.measurement_name}:</span> {m.measurement_value} cm
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No measurements added.</p>
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-8">
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
          <div className="flex justify-end mt-8">
            <button onClick={handlePlaceOrder} className="mt-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700">Place Order</button>
          </div>
        </div>
      </div>
    
  );
};

export default OrderSummaryTailoring;
