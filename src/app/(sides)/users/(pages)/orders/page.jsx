"use client"; 
import React, { useEffect, useState } from "react";
import AddressManager from "../../components/Orders/Address";
import OrderSummary from "../../components/Orders/OrderSummary";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import Lodingcustom from "../../components/ui/Loader"
function OrderPage() {
  const [step, setStep] = useState(1); 
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setaddress] = useState();
  const [loading, setloading] = useState(true)
  const handleSubmit=()=>{
    if(selectedAddress==null){
        alert("please select an address before checkout")
        return
    }

    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    setStep(2);
   }
  const handleBack = () => {
    setStep(1);
  };
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
    <section className="min-h-[100vh] py-6">
    {loading ? (
      <Lodingcustom />
    ) : step === 1 ? (
      <AddressManager
        data={address}
        loading={loading}
        setloading={setloading}
        setaddress={setaddress}
        FetchAdddress={FetchAdddress}
        handleSubmit={handleSubmit}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
    ) : step === 2 ? (
      <OrderSummary selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} handleBack={handleBack} />
    ) : null}
  </section>
  
  );
}

export default OrderPage;
