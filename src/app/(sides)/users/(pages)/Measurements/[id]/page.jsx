"use client";
import React, { use, useState, useEffect } from "react";
import {
  useGetMeasurement,
  useSaveMeasurement,
} from "../../../../../../hooks/designHook";
import CommonNavbar from "../../../components/navbar-common/CommonNavbar";
import { useRouter } from "next/navigation";
import LoadingUi from "../../../../../loading";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";

const TailoringMeasurement = ({ params }) => {
  const { id } = use(params); 
  const { data, isLoading, error } = useGetMeasurement(id);
  const mutation = useSaveMeasurement();
  const router = useRouter();
  const [measurements, setMeasurements] = useState({});
  const [infoVisible, setInfoVisible] = useState({});
  const [customSetName, setCustomSetName] = useState("");
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    try {
      const storedCloth = localStorage.getItem("selectedCloth");
      const storedDesign = localStorage.getItem("selectedDesign");

      setSelectedCloth(storedCloth ? JSON.parse(storedCloth) : {});
      setSelectedDesign(storedDesign ? JSON.parse(storedDesign) : {});
      setProductName(localStorage.getItem("customProductName"));
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  console.log(selectedCloth, "cloth");

  const clothPrice = selectedCloth?.price || 0;
  const designPrice = selectedDesign?.price || 0;
  const totalPrice = clothPrice + designPrice;
  console.log(totalPrice);

  useEffect(() => {
    if (data?.data) {
      const newMeasurements = {};
      data.data.forEach((m) => {
        newMeasurements[m.id] = {
          value: "",
          description: m.description,
          name: m.measurement_name,
        };
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customSetName.trim()) {
      toast.error("Please enter a set name.");
      return;
    }

    const hasValidMeasurements = Object.values(measurements).some(
      (m) => m.value.trim() !== ""
    );

    if (!hasValidMeasurements) {
      toast.error("Please enter at least one measurement.");
      return;
    }

    const formattedValues = Object.keys(measurements).map((key) => ({
      id: key,
      measurement_name: measurements[key].name,
      measurement_value: Number(measurements[key].value) || 0,
    }));

    const tailorProductPayload = {
      designId: id,
      clothId: selectedCloth.id, 
      product_name: productName,
      price: totalPrice,
    };

    try {
      const tailorResponse = await axiosInstance.post(
        "/Order/add/tailorProduct",
        tailorProductPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        }
      );

      if (tailorResponse.status !== 201 && tailorResponse.status !== 200) {
        throw new Error("Failed to add tailor product");
      }
       console.log(tailorResponse)
      const tailorProductId = tailorResponse.data?.data?.tailor_product_id;
      console.log(tailorProductId,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhssssssssssss")
    if (tailorProductId) {
      localStorage.setItem("tailorProductId", tailorProductId);
    }

     
      const measurementPayload = {
        design_id: id,
        set_name: customSetName, 
        values: formattedValues,
      };

      localStorage.setItem(
        "selectedMeasurements",
        JSON.stringify(measurementPayload)
      );
      await mutation.mutateAsync(measurementPayload);

      toast.success("Tailor product added & measurements saved successfully!");
      router.push("/users/Summary");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) return <LoadingUi />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading measurements</p>
    );

  return (
    <>
      <CommonNavbar />
      <ToastContainer />
      <div className="flex">
        <div className="flex-1 relative">
          <div className="absolute left-0 top-0 h-screen overflow-hidden">
            <Image
              src="/login/bg.jpg"
              alt="Elegant jacket display"
              className="object-cover w-full h-full transform scale-110"
              width={400}
              height={400}
              priority
            />
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        </div>
        <div className="bg-white mr-80 shadow-lg rounded-2xl w-full max-w-lg p-8">
          <h2 className="text-3xl font-bold text-gray-600 text-center mb-6">
            Add Your Measurements
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* New Input for Custom Name */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Measurement Set Name
              </label>
              <input
                type="text"
                value={customSetName}
                onChange={(e) => setCustomSetName(e.target.value)}
                placeholder="Enter a custom name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Measurement Inputs */}
            {Object.keys(measurements).map((key) => (
              <div key={key} className="relative">
                <label className="block text-gray-700 font-medium">
                  {measurements[key].name}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name={measurements[key].name}
                    value={measurements[key].value}
                    onChange={(e) => handleChange(e, key)}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:outline-none"
                  />
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
                    <span className="text-sm text-gray-700 font-medium hidden sm:inline">
                      Info
                    </span>
                  </button>
                </div>
                {infoVisible[key] && (
                  <p className="text-sm text-gray-600 mt-1">
                    {measurements[key].description}
                  </p>
                )}
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full bg-black text-white py-2 rounded-full font-semibold text-lg hover:bg-gray-900 transition-all"
              >
                {mutation.isLoading ? "Saving..." : "Save Measurements"}
              </button>
            </div>
            {mutation.isError && (
              <p className="text-red-500 text-center">
                Error saving measurements
              </p>
            )}
            {mutation.isSuccess && (
              <p className="text-green-500 text-center">
                Measurements saved successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default TailoringMeasurement;
