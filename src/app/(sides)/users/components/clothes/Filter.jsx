"use client";
import React, { useState } from "react";
import { MoreVertical, X } from "lucide-react"; // Three-dot menu & close icon

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex flex-col p-4 bg-white w-[250px] rounded-lg shadow-md font-sans">
        <FilterContent />
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow-md"
      >
        <MoreVertical size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-3/4 sm:w-1/2 bg-white h-full p-4 shadow-lg transform translate-x-0 transition-transform">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
              <X size={24} />
            </button>

            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

const FilterContent = () => {
  return (
    <>
      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">Design</label>
        <div className="flex flex-col mt-2 space-y-3">
          {["Casual", "Formal", "Sport", "Traditional"].map((item) => (
            <label key={item} className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
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
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{material}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
