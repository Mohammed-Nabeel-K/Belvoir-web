// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// const OrderSummary = () => {
//   const [selectedCloth, setSelectedCloth] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [selectedMeasurements, setSelectedMeasurements] = useState(null);
//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     setOrderDetails(JSON.parse(localStorage.getItem("orderDetails")) || {});
//     setSelectedCloth(JSON.parse(localStorage.getItem("selectedCloth")) || {});
//     setSelectedDesign(JSON.parse(localStorage.getItem("selectedDesign")) || {});
//     setSelectedMeasurements(JSON.parse(localStorage.getItem("selectedMeasurements")) || {});
//   }, []);

//   if (!selectedCloth || !selectedDesign || !selectedMeasurements) {
//     return <p className="text-center text-gray-500">Loading order details...</p>;
//   }

//   const clothPrice = selectedCloth.price || 0;
//   const designPrice = selectedDesign.price || 0;
//   const totalPrice = clothPrice + designPrice;

//   return (
//     <div
//       className="font-sans min-h-screen bg-cover bg-center relative"
//       style={{
//         backgroundImage: `url('/clothes/clothess.png')`, // Change to your actual image path
//       }}
//     >
//       {/* Background Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

//       <div className="relative z-10 p-6 max-w-4xl mx-auto bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Order Summary</h2>

//         {/* Delivery Details */}
//         <div className="mb-6 bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-sm">
//           <h6 className="text-sm font-semibold text-gray-600 mb-1">Deliver to:</h6>
//           <h5 className="text-lg font-bold text-gray-800">{orderDetails.fullName}</h5>
//           <p className="text-gray-700">
//             {orderDetails.address}, {orderDetails.state}, {orderDetails.pincode}
//           </p>
//           <p className="text-gray-700">{orderDetails.phoneNumber}</p>
//           <Link href={"/users/Address"}>
//             <button className="mt-2 px-4 py-2 bg-violet-950 text-white font-semibold rounded-md shadow hover:bg-blue-600">
//               Change Address
//             </button>
//           </Link>
//         </div>

        // {/* Cloth Details */}
        // <Link href={`/users/clothes/${selectedCloth.id}`}>
        //   <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6">
        //     <div className="flex items-center gap-4">
        //       <img src={selectedCloth.imageUrl} alt={selectedCloth.title} className="w-16 h-16 object-cover rounded-md" />
        //       <div>
        //         <h3 className="font-medium text-gray-700">{selectedCloth.title}</h3>
        //         <p className="text-gray-500">Price: ₹{clothPrice}</p>
        //       </div>
        //     </div>
        //   </div>
        // </Link>

        // {/* Design Details */}
        // <Link href={`/users/clothes/${selectedDesign.id}`}>
        //   <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6">
        //     <div className="flex items-center gap-4">
        //       <img src={selectedDesign.images[0].imageUrl} alt={selectedDesign.name} className="w-16 h-16 object-cover rounded-md" />
        //       <div>
        //         <h3 className="font-medium text-gray-700">{selectedDesign.name}</h3>
        //         <p className="text-gray-500">Price: ₹{designPrice}</p>
        //       </div>
        //     </div>
        //   </div>
        // </Link>

        // {/* Measurements */}
        // <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6">
        //   <h3 className="font-medium text-gray-700">Measurements</h3>
        //   {selectedMeasurements?.values?.length > 0 ? (
        //     <ul className="text-gray-500">
        //       {selectedMeasurements.values.map((m, index) => (
        //         <li key={index} className="mt-2">
        //           <span className="font-semibold text-gray-700">{m.measurement_name}:</span> {m.measurement_value} cm
        //         </li>
        //       ))}
        //     </ul>
        //   ) : (
        //     <p className="text-gray-500">No measurements added.</p>
        //   )}
        // </div>

        // {/* Price Summary */}
        // <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-md mb-8">
        //   <h3 className="font-medium text-gray-700">Price Details</h3>
        //   <div className="flex justify-between mt-4">
        //     <p className="text-gray-500">Cloth Price</p>
        //     <p className="text-gray-800">₹{clothPrice}</p>
        //   </div>
        //   <div className="flex justify-between mt-4">
        //     <p className="text-gray-500">Design Price</p>
        //     <p className="text-gray-800">₹{designPrice}</p>
        //   </div>
        //   <hr className="border-t border-gray-300 my-4" />
        //   <div className="flex justify-between mt-4 font-semibold">
        //     <p>Total Price</p>
        //     <p className="text-gray-800">₹{totalPrice}</p>
        //   </div>
        //   <div className="flex justify-end mt-8">
        //   <Link href={"/users/Payment"}>
        //     <button className="mt-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700">
        //       proceed to payment
        //     </button>
        //   </Link>
        //   </div>
        // </div>
//       </div>

      
//     </div>
//   );
// };

// export default OrderSummary;
"use client"; 
import React, { useEffect, useState } from "react";
import AddressManager from "../../components/Checkout/Address";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import Lodingcustom from "../../components/ui/Loader"
import Navbar from "../../components/ui/navbar/Navbar";
import OrderSummaryTailoring from "../../components/summary/OrderSummary-tailoring";
function OrderPage() {
  const [step, setStep] = useState(1); 
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setaddress] = useState();
  const [loading, setloading] = useState(true)
 
  const FetchAdddress=async()=>{
    try {
      setloading(true);
      var response=await axiosInstance.get("/Address/user",{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("userData")}`
        }
      })
      var temp=response.data.data.slice(0,3);
      setaddress(temp);
    } catch (error) {
      console.log(error);
    }finally{
      setloading(false)
    }
   
  }
  useEffect(() => {  
      FetchAdddress();
  }, [])
  
  return (
    <>
    <Navbar></Navbar>
    {loading && <Lodingcustom /> }
    {!loading &&
    <section className="min-h-[100vh] py-6 grid grid-cols-2 px-4 ">
      <AddressManager
        data={address}
        loading={loading}
        setloading={setloading}
        setaddress={setaddress}
        FetchAdddress={FetchAdddress}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <OrderSummaryTailoring selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}  setloading={setloading}
 />
  </section>}
  </>
  );
}

export default OrderPage;