"use client";
import React, { useState } from "react";

const Filter = ({ filterdata, setfilterdata ,setMinPrice,setMaxPrice}) => {

  return (
    <div className="lg:w-[200px]">
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
                onChange={() => setfilterdata({ ...filterdata, gender: item })}
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
              className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
            >
              <option disabled>Min-price</option>
              <option>0</option>
              <option>100</option>
              <option>500</option>
              <option>1000</option>
              <option>2000</option>
            </select>
            <p className="mx-2">to</p>
            <select
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
            >
              <option disabled>Max-price</option>
              <option>500</option>
              <option>1000</option>
              <option>2000</option>
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
          {["39e0ec7a-e077-11ef-86df-32b126bedf2d"].map((material) => (
            <label
              key={material}
              className="inline-flex items-center text-gray-700"
            >
              <input
                type="radio"
                name="fabrictype"
                value={material}
                checked={filterdata.fabrictype === material}
                onChange={() =>
                  setfilterdata({ ...filterdata, fabrictype: material })
                }
                className="h-5 w-5 appearance-none rounded-full border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-[15px]">{material}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
