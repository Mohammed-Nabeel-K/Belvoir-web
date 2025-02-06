"use client"; 
import React, { useState } from "react";
import AddressManager from "../../components/Orders/Address";
import OrderSummary from "../../components/Orders/OrderSummary";

function OrderPage() {
  const [step, setStep] = useState(1); 
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSubmit=()=>{
    if(selectedAddress==null){
        alert("please select an address before checkout")
        return
    }
    setStep(2);
   }
  const handleBack = () => {
    setStep(1);
  };

  return (
    <section className="min-h-[100vh] py-6">
      {step === 1 ? (
        <AddressManager handleSubmit={handleSubmit} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}/>
      ) : (
        <OrderSummary selectedAddress={selectedAddress} handleBack={handleBack} />
      )}
    </section>
  );
}

export default OrderPage;
