"use client";
import React, { use,useState, useEffect } from "react";
import { useGetMeasurement } from "../../../../../../hooks/designHook";
import { useSaveMeasurement} from "../../../../../../hooks/designHook"; 
import CommonNavbar from "../../../components/navbar-common/CommonNavbar";
import {useRouter} from "next/navigation";
import LoadingUi from "../../../../../loading"
import Image from "next/image";

const TailoringMeasurement = ({ params }) => {
  const { id } = use(params);
  const { data, isLoading, error } = useGetMeasurement(id);
  const mutation = useSaveMeasurement(); 
  const router = useRouter();
  const [measurements, setMeasurements] = useState({});
  const [infoVisible, setInfoVisible] = useState({}); 

  useEffect(() => {
    if (data?.data) {
      const newMeasurements = {};
      data.data.forEach((m) => {
        newMeasurements[m.id] = { value: "", description: m.description, name: m.measurement_name };
      });
      setMeasurements(newMeasurements);
    }
  }, [data]);

  const handleChange = (e, id) => {
    setMeasurements((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: e.target.value },
    }));
  };

  const toggleInfo = (id) => {
    setInfoVisible((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formattedValues = Object.keys(measurements).map((key) => ({
  //     id: key,
  //     measurement_value: Number(measurements[key].value) || 0,
  //   }));
  //   console.log(formattedValues,".....valuessssssssss")

  //   const payload = {
  //     design_id: id,
  //     set_name: "Custom Measurements",
  //     values: formattedValues,
  //   };
  //   mutation.mutate(payload); 
  //     console.log(payload,"................payload");
  //   localStorage.setItem("selectedMeasurements", JSON.stringify(payload));
  //   router.push("/users/Summary");
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedValues = Object.keys(measurements).map((key) => ({
      id: key,
      measurement_name: measurements[key].name,  // ✅ Make sure the name is included
      measurement_value: Number(measurements[key].value) || 0,
    }));
  
    const payload = {
      design_id: id,
      set_name: "Custom Measurements",
      values: formattedValues,
    };
  
    // ✅ Store in localStorage
    localStorage.setItem("selectedMeasurements", JSON.stringify(payload));
  
    mutation.mutate(payload);
    router.push("/users/Address");
  };
  
  if (isLoading) return <LoadingUi/>
  if (error) return <p className="text-center text-red-500">Error loading measurements</p>;

  return (
    <>
      <CommonNavbar />
      <div className="flex">
        
      <div className="flex-1 relative">
        
        <div className="absolute left-0 top-0 h-screen overflow-hidden">
          <Image
            src="/login/bg.jpg"
            alt="Elegant jacket display"
            className="object-cover  w-full h-full transform scale-110"
            width={400}
            height={400}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
      </div>
        <div className="bg-white  mr-80 shadow-lg rounded-2xl w-full max-w-lg p-8">
          <h2 className="text-3xl font-bold text-gray-600 text-center mb-6">Add Your Measurements</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {Object.keys(measurements).map((key) => (
              <div key={key} className="relative">
                <label className="block text-gray-700 font-medium">{measurements[key].name}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name={measurements[key].name}
                    value={measurements[key].value}
                    onChange={(e) => handleChange(e, key)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-black  focus:outline-none"
                  />
                  {/* <button type="button" onClick={() => toggleInfo(key)} className="bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition">
                    ℹ️
                  </button> */}
                 <button 
  type="button" 
  onClick={() => toggleInfo(key)} 
  className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-1"
  aria-label="More information"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-5 h-5 text-gray-600"
  >
    <path 
      fillRule="evenodd" 
      d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-.75-11.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0zm-.5 3.75a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5z" 
      clipRule="evenodd"
    />
  </svg>
  <span className="text-sm text-gray-700 font-medium hidden sm:inline">Info</span>
</button>




                </div>
                {infoVisible[key] && <p className="text-sm text-gray-600 mt-1">{measurements[key].description}</p>}
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <button type="submit" disabled={mutation.isLoading} className="w-full bg-black text-white py-2 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all">
                {mutation.isLoading ? "Saving..." : "Save Measurements"}
              </button>
            </div>
            {mutation.isError && <p className="text-red-500 text-center">Error saving measurements</p>}
            {mutation.isSuccess && <p className="text-green-500 text-center">Measurements saved successfully!</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default TailoringMeasurement;
