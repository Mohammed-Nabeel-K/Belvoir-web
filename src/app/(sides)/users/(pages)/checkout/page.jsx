"use client"; 
import React, { useEffect, useState } from "react";
import AddressManager from "../../components/Checkout/Address";
import OrderSummary from "../../components/Checkout/OrderSummary";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import Lodingcustom from "../../components/ui/Loader"
import Navbar from "../../components/ui/navbar/Navbar";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
function OrderPage() {

  const router=useRouter()
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
      if(error.response.status==401){
        toast.error("please login")
        router.push("/login")
      }
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
      <OrderSummary selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress}  setloading={setloading}
 />
  </section>}
  </>
  );
}

export default OrderPage;
