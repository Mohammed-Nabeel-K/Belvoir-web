

"use client";
import { useClothesFilterBy } from "@/hooks/clothesHook";
import React, { useState, useEffect } from "react";

const Filter = ({
  setMaterial,
  Material,
  setDesignPattern,
  setColor,
  setMaxPrice,
  setMinPrice,
}) => {
  const { data } = useClothesFilterBy();

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedDesignPatterns, setSelectedDesignPatterns] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    setMaterial(selectedMaterials);
  }, [selectedMaterials, setMaterial]);

  useEffect(() => {
    setDesignPattern(selectedDesignPatterns);
  }, [selectedDesignPatterns, setDesignPattern]);

  useEffect(() => {
    setColor(selectedColors);
  }, [selectedColors, setColor]);

  const handleMaterialChange = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((item) => item !== material) 
        : [...prev, material] 
    );
  };

  const handleDesignPatternChange = (pattern) => {
    setSelectedDesignPatterns((prev) =>
      prev.includes(pattern)
        ? prev.filter((item) => item !== pattern)
        : [...prev, pattern]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="w-[300px] p-10">
      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">
          Material
        </label>
        <div className="flex flex-col mt-2 space-y-3">
          {data?.data?.materialtype.map((material) => (
            <label
              key={material.id}
              className="inline-flex items-center text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.name)}
                onChange={() => handleMaterialChange(material.name)}
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{material.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">
          Design Pattern
        </label>
        <div className="flex flex-col mt-2 space-y-3">
          {data?.data?.designtype.map((pattern) => (
            <label
              key={pattern.id}
              className="inline-flex items-center text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedDesignPatterns.includes(pattern.name)}
                onChange={() => handleDesignPatternChange(pattern.name)}
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{pattern.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">
          Price
        </label>
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

      <div className="mb-6">
        <label className="block text-xl font-semibold text-gray-800">
          Color
        </label>
        <div className="flex flex-col mt-2 space-y-3">
          {data?.data?.colors.map((color) => (
            <label
              key={color.id}
              className="inline-flex items-center text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color.name)}
                onChange={() => handleColorChange(color.name)}
                className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
              />
              <span className="ml-3 text-lg">{color.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;