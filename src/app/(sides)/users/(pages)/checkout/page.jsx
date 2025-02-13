"use client"; 
import React, { useEffect, useState } from "react";
import AddressManager from "../../components/Checkout/Address";
import OrderSummary from "../../components/Checkout/OrderSummary";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import Lodingcustom from "../../components/ui/Loader"
function OrderPage() {
  const [step, setStep] = useState(1); 
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setaddress] = useState();
  const [loading, setloading] = useState(true)
 
  const FetchAdddress=async()=>{
    var response=await axiosInstance.get("/Address/user",{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("userData")}`
      }
    })

    setaddress(response.data.data);
    setloading(false);
  }
  useEffect(() => {  
      FetchAdddress();
  }, [])
  
  
  return (
    <>
    {loading &&<Lodingcustom />}
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
      <OrderSummary selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}  />
  </section>
  </>
  );
}

export default OrderPage;
