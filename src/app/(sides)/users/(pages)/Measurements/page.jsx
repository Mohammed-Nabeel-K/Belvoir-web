"use client";
import Link from "next/link";
import React, { useState } from "react";
import CommonNavbar from "../../components/navbar-common/CommonNavbar";


const TailoringMeasurement = () => {

  const [measurements, setMeasurements] = useState({
    length: "",
    chest: "",
    sleeveLength: "",
    type: "",
  });

  const handleChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  const handleUseExisting = () => {
    setMeasurements({
      length: "40",
      chest: "38",
      sleeveLength: "24",
      type: "shirt",
    });
  };

  return (
    <>
    <CommonNavbar/>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 p-10 font-sans">
      <Link href={"/users/Design"}>
      <button
        className="absolute top-10 left-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      </Link>

      <div className="max-w-md w-full -ml-6">
        <img
          src="https://cdn8.bigcommerce.com/s-003c4/product_images/uploaded_images/shirt-size-chart.jpg"
          alt="Size Chart"
          className="rounded-lg shadow-lg w-full"
        />
      </div>

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-gray-600 text-center mb-6">
          Add Your Measurements
        </h2>

        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-700 font-medium">Length</label>
            <input
              type="number"
              name="length"
              value={measurements.length}
              onChange={handleChange}
              placeholder="Enter length (in inches)"
              className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Chest</label>
            <input
              type="number"
              name="chest"
              value={measurements.chest}
              onChange={handleChange}
              placeholder="Enter chest size (in inches)"
              className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium">Sleeve Length</label>
            <input
              type="number"
              name="sleeveLength"
              value={measurements.sleeveLength}
              onChange={handleChange}
              placeholder="Enter sleeve length (in inches)"
              className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Type</label>
            <select
              name="type"
              value={measurements.type}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="blouse">Blouse</option>
              <option value="kurta">Kurta</option>
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleUseExisting}
              className="w-1/2 bg-yellow-700 text-white py-2 rounded-full font-semibold text-lg hover:bg-yellow-800 transition-all"
            >
              Use Existing
            </button>
           
            <button 
              type="submit"
              className="w-1/2 bg-violet-950 text-white py-2 rounded-full font-semibold text-lg hover:bg-blue-900 transition-all"
            > <Link href={"/users/Summary"}>
              Save Measurements
              </Link>
            </button>
            
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default TailoringMeasurement;
