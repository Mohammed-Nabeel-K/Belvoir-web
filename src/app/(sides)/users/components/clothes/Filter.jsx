// "use client";
// import { useClothesFilterBy } from "@/hooks/clothesHook";
// import React, { useState } from "react";

// const Filter = ({setMaterial,setDesignPattern,setMaxPrice,setMinPrice}) => {

//   const {data}=useClothesFilterBy();
//   console.log(data?.data)
//   return (
//     <div className="w-[300px] p-5">
// <div className="mb-6 font-sans">
//   <label className="block text-xl font-bold text-gray-800">Design</label>
//   <div className="flex flex-col mt-2 space-y-3">
//     {/* {data?.data[0].map((item) => (
//       <label key={item} className="inline-flex items-center text-gray-700">
//         <input
//           type="checkbox"
//           onClick={()=>setDesignPattern(item)}
//           className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//         />
//         <span className="ml-3 text-lg">{item}</span>
//       </label>
//     ))} */}
//   </div>
// </div>

// <div className="mb-6">
//   <label className="block text-m font-semibold text-gray-800">
//     Price
//   </label>
//   <div className="mb-6">
//     <div className="flex">
//       <select
//         onChange={(e) => setMinPrice(Number(e.target.value))}
//         className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//       >
//         <option disabled>Min-price</option>
//         <option>0</option>
//         <option>100</option>
//         <option>500</option>
//         <option>1000</option>
//         <option>2000</option>
//       </select>
//       <p className="mx-2">to</p>
//       <select
//         onChange={(e) => setMaxPrice(Number(e.target.value))}
//         className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//       >
//         <option disabled>Max-price</option>
//         <option>500</option>
//         <option>1000</option>
//         <option>2000</option>
//       </select>
//     </div>
//   </div>
// </div>
// <div className="mb-6">
//   <label className="block text-xl font-semibold text-gray-800">Color</label>
//   <div className="flex flex-col mt-2 space-y-3">
//     {["Red", "Blue", "Green", "Black"].map((color) => (
//       <label key={color} className="inline-flex items-center text-gray-700">
//         <input
//           type="checkbox"

//           className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//         />
//         <span className="ml-3 text-lg">{color}</span>
//       </label>
//     ))}
//   </div>
// </div>

//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">Material</label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {["Cotton", "Silk", "Synthetic", "Wool"].map((material) => (
//             <label key={material} className="inline-flex items-center text-gray-700">
//               <input
//                 type="checkbox"
//                 onClick={()=>setMaterial(material)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{material}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;

// "use client";
// import { useClothesFilterBy } from "@/hooks/clothesHook";
// import React, { useState } from "react";

// const Filter = ({ setMaterial, setDesignPattern,SetColor, setMaxPrice, setMinPrice }) => {
//   const { data } = useClothesFilterBy();
//   console.log(data?.data);

//   // State to manage selected materials
//   const [selectedMaterials, setSelectedMaterials] = useState([]);

//   const handleMaterialChange = (material) => {
//     setSelectedMaterials((prev) => {
//       let updatedMaterials;
//       if (prev.includes(material)) {
//         // Remove material if already selected
//         updatedMaterials = prev.filter((item) => item !== material);
//       } else {
//         // Add material if not selected
//         updatedMaterials = [...prev, material];
//       }
//       setMaterial(updatedMaterials); // Pass updated array to parent
//       return updatedMaterials;
//     });
//   };

//   return (
//     <div className="w-[300px] p-5">
//       {/* Material Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">Material</label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {["Cotton", "Silk", "Synthetic", "Wool"].map((material) => (
//             <label key={material} className="inline-flex items-center text-gray-700">
//               <input
//                 type="checkbox"
//                 checked={selectedMaterials.includes(material)}
//                 onChange={() => handleMaterialChange(material)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{material}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//       <div className="mb-6 font-sans">
//         <label className="block text-xl font-bold text-gray-800">Design</label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {/* {data?.data[0].map((item) => (
//             <label key={item} className="inline-flex items-center text-gray-700">
//               <input
//                 type="checkbox"
//                 onClick={()=>setDesignPattern(item)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{item}</span>
//             </label>
//           ))} */}
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="block text-m font-semibold text-gray-800">
//           Price
//         </label>
//         <div className="mb-6">
//           <div className="flex">
//             <select
//               onChange={(e) => setMinPrice(Number(e.target.value))}
//               className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//             >
//               <option disabled>Min-price</option>
//               <option>0</option>
//               <option>100</option>
//               <option>500</option>
//               <option>1000</option>
//               <option>2000</option>
//             </select>
//             <p className="mx-2">to</p>
//             <select
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//             >
//               <option disabled>Max-price</option>
//               <option>500</option>
//               <option>1000</option>
//               <option>2000</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">Color</label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {["Red", "Blue", "Green", "Black"].map((color) => (
//             <label key={color} className="inline-flex items-center text-gray-700">
//               <input
//                 type="checkbox"

//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{color}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Filter;
// "use client";
// import { useClothesFilterBy } from "@/hooks/clothesHook";
// import React, { useState } from "react";

// const Filter = ({
//   setMaterial,
//   Material,
//   setDesignPattern,
//   setColor,
//   setMaxPrice,
//   setMinPrice,
// }) => {
//   const { data } = useClothesFilterBy();
//   console.log(Material)
//   // console.log(data);

//   // State to manage selected filters
//   const [selectedMaterials, setSelectedMaterials] = useState([]);
//   const [selectedDesignPatterns, setSelectedDesignPatterns] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);

//   // Handle Material Change
//   const handleMaterialChange = (material) => {
//     setSelectedMaterials((prev) => {
//       let updatedMaterials = prev.includes(material)
//         ? prev.filter((item) => item !== material)
//         : [...prev, material];
//       console.log(updatedMaterials,"j")

//       setMaterial(updatedMaterials); // Pass updated array to parent
//         console.log(Material,"kkkkkkkkkkkkkkkkkk")
//       return updatedMaterials;
//     });
//   };

//   // Handle Design Pattern Change
//   const handleDesignPatternChange = (pattern) => {
//     setSelectedDesignPatterns((prev) => {
//       let updatedPatterns = prev.includes(pattern)
//         ? prev.filter((item) => item !== pattern)
//         : [...prev, pattern];

//       setDesignPattern(updatedPatterns); // Pass updated array to parent
//       return updatedPatterns;
//     });
//   };

//   // Handle Color Change
//   const handleColorChange = (color) => {
//     setSelectedColors((prev) => {
//       let updatedColors = prev.includes(color)
//         ? prev.filter((item) => item !== color)
//         : [...prev, color];

//       setColor(updatedColors); // Pass updated array to parent
//       return updatedColors;
//     });
//   };

//   return (
//     <div className="w-[300px] p-5">
//       {/* Material Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Material
//         </label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {data?.data?.materialtype.map((material) => (
//             <label
//               key={material.id}
//               className="inline-flex items-center text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedMaterials.includes(material.name)}
//                 onChange={() => handleMaterialChange(material.name)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{material.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Design Pattern Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Design Pattern
//         </label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {data?.data?.designtype.map((pattern) => (
//             <label
//               key={pattern.id}
//               className="inline-flex items-center text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedDesignPatterns.includes(pattern.name)}
//                 onChange={() => handleDesignPatternChange(pattern.name)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{pattern.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Price Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Price
//         </label>
//         <div className="flex">
//           <select
//             onChange={(e) => setMinPrice(Number(e.target.value))}
//             className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//           >
//             <option disabled>Min-price</option>
//             <option>0</option>
//             <option>100</option>
//             <option>500</option>
//             <option>1000</option>
//             <option>2000</option>
//           </select>
//           <p className="mx-2">to</p>
//           <select
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//           >
//             <option disabled>Max-price</option>
//             <option>500</option>
//             <option>1000</option>
//             <option>2000</option>
//           </select>
//         </div>
//       </div>

//       {/* Color Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Color
//         </label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {data?.data?.colors.map((color) => (
//             <label
//               key={color.id}
//               className="inline-flex items-center text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedColors.includes(color.name)}
//                 onChange={() => handleColorChange(color.name)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{color.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;


// "use client";
// import { useClothesFilterBy } from "@/hooks/clothesHook";
// import React, { useState, useEffect } from "react";

// const Filter = ({
//   setMaterial,
//   Material,
//   setDesignPattern,
//   setColor,
//   setMaxPrice,
//   setMinPrice,
// }) => {
//   const { data } = useClothesFilterBy();

//   // State to manage selected filters
//   const [selectedMaterials, setSelectedMaterials] = useState([]);
//   const [selectedDesignPatterns, setSelectedDesignPatterns] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);

//   // Handle Material Change
//   const handleMaterialChange = (material) => {
//     setSelectedMaterials((prev) => {
//       const updatedMaterials = prev.includes(material)
//         ? prev.filter((item) => item !== material)
//         : [...prev, material];
//       setMaterial(updatedMaterials); // Pass updated array to parent
//       return updatedMaterials;
//     });
//   };

//   // Handle Design Pattern Change
//   const handleDesignPatternChange = (pattern) => {
//     setSelectedDesignPatterns((prev) => {
//       const updatedPatterns = prev.includes(pattern)
//         ? prev.filter((item) => item !== pattern)
//         : [...prev, pattern];
//       setDesignPattern(updatedPatterns); // Pass updated array to parent
//       return updatedPatterns;
//     });
//   };

//   // Handle Color Change
//   const handleColorChange = (color) => {
//     setSelectedColors((prev) => {
//       const updatedColors = prev.includes(color)
//         ? prev.filter((item) => item !== color)
//         : [...prev, color];
//       setColor(updatedColors); // Pass updated array to parent
//       return updatedColors;
//     });
//   };

//   return (
//     <div className="w-[300px] p-5">
//       {/* Material Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Material
//         </label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {data?.data?.materialtype.map((material) => (
//             <label
//               key={material.id}
//               className="inline-flex items-center text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedMaterials.includes(material.name)}
//                 onChange={() => handleMaterialChange(material.name)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{material.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Design Pattern Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Design Pattern
//         </label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {data?.data?.designtype.map((pattern) => (
//             <label
//               key={pattern.id}
//               className="inline-flex items-center text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedDesignPatterns.includes(pattern.name)}
//                 onChange={() => handleDesignPatternChange(pattern.name)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{pattern.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Price Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Price
//         </label>
//         <div className="flex">
//           <select
//             onChange={(e) => setMinPrice(Number(e.target.value))}
//             className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//           >
//             <option disabled>Min-price</option>
//             <option>0</option>
//             <option>100</option>
//             <option>500</option>
//             <option>1000</option>
//             <option>2000</option>
//           </select>
//           <p className="mx-2">to</p>
//           <select
//             onChange={(e) => setMaxPrice(Number(e.target.value))}
//             className="bg-[#0E0E25] text-[12px] outline-none rounded-md text-white"
//           >
//             <option disabled>Max-price</option>
//             <option>500</option>
//             <option>1000</option>
//             <option>2000</option>
//           </select>
//         </div>
//       </div>

//       {/* Color Filter */}
//       <div className="mb-6">
//         <label className="block text-xl font-semibold text-gray-800">
//           Color
//         </label>
//         <div className="flex flex-col mt-2 space-y-3">
//           {data?.data?.colors.map((color) => (
//             <label
//               key={color.id}
//               className="inline-flex items-center text-gray-700"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedColors.includes(color.name)}
//                 onChange={() => handleColorChange(color.name)}
//                 className="form-checkbox h-5 w-5 appearance-none rounded border-2 border-black focus:ring-0 checked:bg-black checked:border-black checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:font-bold checked:before:flex checked:before:justify-center"
//               />
//               <span className="ml-3 text-lg">{color.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filter;




















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

  // Local state for selected filters
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedDesignPatterns, setSelectedDesignPatterns] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Update parent state when local state changes
  useEffect(() => {
    setMaterial(selectedMaterials);
  }, [selectedMaterials, setMaterial]);

  useEffect(() => {
    setDesignPattern(selectedDesignPatterns);
  }, [selectedDesignPatterns, setDesignPattern]);

  useEffect(() => {
    setColor(selectedColors);
  }, [selectedColors, setColor]);

  // Handle Material Change
  const handleMaterialChange = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((item) => item !== material) // Remove if already selected
        : [...prev, material] // Add if not selected
    );
  };

  // Handle Design Pattern Change
  const handleDesignPatternChange = (pattern) => {
    setSelectedDesignPatterns((prev) =>
      prev.includes(pattern)
        ? prev.filter((item) => item !== pattern)
        : [...prev, pattern]
    );
  };

  // Handle Color Change
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="w-[300px] p-5">
      {/* Material Filter */}
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

      {/* Design Pattern Filter */}
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

      {/* Price Filter */}
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

      {/* Color Filter */}
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