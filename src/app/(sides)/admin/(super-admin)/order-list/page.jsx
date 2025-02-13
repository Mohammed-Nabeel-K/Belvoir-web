"use client";
import React, { useEffect, useState } from "react";
import OrderTable from "../../components/ui/order-table/Order-table";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
const page = () => {
  const [toggler, settoggler] = useState(true);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        setloading(true);
        if (toggler) {
          const response = await axiosInstance.get("/Order/admin");
          setdata(response.data.data);
        } else {
          const response = await axiosInstance.get("/Order/admin");
          setdata(response.data.data);
        }
      } catch (error) {
        console.log("error in fetching order admin data", error);
      } finally {
        setloading(false);
      }
    };
    fetchproduct();
  }, []);

  return (
    <>
      <div className="flex py-2 px-2 justify-center">
        <button
          className={
            toggler
              ? "px-2 py-2 border-[2px] rounded-[10px] bg-[#0F172A] text-white mx-2 border-none"
              : "px-2 py-2 border-[2px] rounded-[10px] border-[#0F172A] mx-2"
          }
          onClick={() => settoggler(true)}
        >
          Rental orders
        </button>
        <button
          className={
            !toggler
              ? "px-2 py-2 border-[2px] rounded-[10px] bg-[#0F172A] text-white mx-2 border-none"
              : "px-2 py-2 border-[2px] rounded-[10px] border-[#0F172A] mx-2"
          }
          onClick={() => settoggler(false)}
        >
          Tailoring Orders
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center mx-auto  h-screen w-full">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}
      <OrderTable data={data}></OrderTable>
    </>
  );
};

export default page;
