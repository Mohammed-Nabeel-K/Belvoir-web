"use client";
import React, { useState } from "react";

const Filter = ({setMaterial,setDesignPattern}) => {
  const [price, setPrice] = useState(100);

  return (
    <div className="w-[300px] p-5">
      <div className="mb-6 font-sans">
        <label className="block text-xl font-bold text-gray-800">Design</label>
        <div className="flex flex-col mt-2 space-y-3">
          {["Striped", "Formal", "Sport", "Traditional"].map((item) => (
            <label key={item} className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                onClick={()=>setDesignPattern(item)}
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">Price</label>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-2 w-full h-3 bg-gray-200 rounded-lg cursor-pointer accent-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">Color</label>
        <div className="flex flex-col mt-2 space-y-3">
          {["Red", "Blue", "Green", "Black"].map((color) => (
            <label key={color} className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
               
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{color}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">Material</label>
        <div className="flex flex-col mt-2 space-y-3">
          {["Cotton", "Silk", "Synthetic", "Wool"].map((material) => (
            <label key={material} className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                onClick={()=>setMaterial(material)}
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{material}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
