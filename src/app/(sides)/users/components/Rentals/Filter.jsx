"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Filter = ({
  filterdata,
  setfilterdata,
  setMinPrice,
  setMaxPrice,
  minprice,
  maxprice,
  filteropen,
  isLoading
}) => {
  const initialFilterData = {
    gender: "",
    garmenttype: "",
    fabrictype: "",
  };
  const [fabricdata, setfabricdata] = useState();
  useEffect(() => {
    const Fetchcategory = async () => {
      isLoading=false;
      const token = localStorage.getItem("userData");
      const response = await axiosInstance.get("/Fabric", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setfabricdata(response.data.data);
      isLoading=true
    };
    Fetchcategory();
  }, []);

  return (
      <div className="lg:w-[200px] lg:border-r-[1px] lg:border-t-[1px] lg:pt-5 lg:border-b-[1px] p-7 pb-3 lg:bg-gray-100 bg-white rounded-[10px]">
        {/* Gender */}
        <div className="mb-6">
          <label className="block text-m font-semibold text-gray-800">
            Gender
          </label>
          <div className="flex flex-col mt-2 space-y-3">
            {["male", "female", "unisex"].map((item) => (
              <label
                key={item}
                className="inline-flex items-center text-gray-700"
              >
                <input
                  type="radio"
                  name="gender"
                  value={item}
                  checked={filterdata.gender === item}
                  onChange={() =>
                    setfilterdata({ ...filterdata, gender: item })
                  }
                  className="h-5 w-5 appearance-none rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
                />
                <span className="ml-3 text-[15px]">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-m font-semibold text-gray-800">
            Price
          </label>
          <div className="mb-6">
            <div className="flex">
              <select
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border-[#0E0E25] border-[1px] text-[12px] outline-none rounded-md text-[#0E0E25]"
                value={minprice}
              >
                <option defaultChecked Value={" "}>
                  min
                </option>
                <option value={"100"}>100</option>
                <option value={"500"}>500</option>
                <option value={"1000"}>1000</option>
                <option value={"2000"}>2000</option>
              </select>
              <p className="mx-2">to</p>
              <select
                value={maxprice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border-[#0E0E25] border-[1px] text-[12px] outline-none rounded-md text-[#0E0E25]"
              >
                <option defaultChecked value={""}>
                  max
                </option>
                <option value="500" disabled={500 <= minprice}>
                  500
                </option>
                <option value="1000" disabled={1000 <= minprice}>
                  1000
                </option>
                <option value="2000" disabled={2000 <= minprice}>
                  2000
                </option>
                <option value="5000" disabled={5000 <= minprice}>
                  5000
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Garment Type */}
        <div className="mb-6">
          <label className="block text-m font-semibold text-gray-800">
            Garment Type
          </label>
          <div className="flex flex-col mt-2 space-y-3">
            {["tops", "bottoms", "outerwear"].map((color) => (
              <label
                key={color}
                className="inline-flex items-center text-gray-700"
              >
                <input
                  type="radio"
                  name="garmenttype"
                  value={color}
                  checked={filterdata.garmenttype === color}
                  onChange={() =>
                    setfilterdata({ ...filterdata, garmenttype: color })
                  }
                  className="h-5 w-5 appearance-none rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
                />
                <span className="ml-3 text-[15px]">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fabric Type */}
        <div className="mb-6">
          <label className="block text-m font-semibold text-gray-800">
            Fabric Type
          </label>
          <div className="flex flex-col mt-2 space-y-3">
            {fabricdata?.map((material, i) => (
              <label key={i} className="inline-flex items-center text-gray-700">
                <input
                  type="radio"
                  name="fabrictype"
                  value={material.id}
                  checked={filterdata.fabrictype == material.id}
                  onChange={() =>
                    setfilterdata({ ...filterdata, fabrictype: material.id })
                  }
                  className="h-5 w-5 appearance-none rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
                />
                <span className="ml-3 text-[15px]">{material.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="px-3 flex py-1  text-[12px] text-[#0E0E25] border-[#0E0E25] border-[2px] rounded-md"
            onClick={() => {
              setfilterdata(initialFilterData);
              setMaxPrice("");
              setMinPrice("");
            }}
          >
            reset
            <FontAwesomeIcon icon={faTrashCan} className="size-3 my-auto ml-2"/>
          </button>
        </div>
      </div>
    
  );
};

export default Filter;
