"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { toast } from "react-toastify";

const AddressManager = ({
  selectedAddress,
  setSelectedAddress,
  data,
  setaddress,
  FetchAdddress,
  loading,
  setloading,
}) => {
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isaddingnew, setisaddingnew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle selecting an address
  const handleSelect = (data) => {
    setSelectedAddress(data);
  };

  // Handle editing an address
  const handleEdit = (data) => {
    setEditingAddress(data);
    setIsAdding(true);
  };

  // Handle saving edited address
  const handleSaveEdit = async (updatedData) => {
    setloading(true);
    try {
      const response =await axiosInstance.put(
        `/Address/${editingAddress.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        }
      );
      if(response.data.statusCode==200){
        toast.success("Address edited successfully")
      }else{
        toast.error("issue in editing address")
      }
      FetchAdddress();
      setaddress(data);
      setIsAdding(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setloading(false);
    }
  };

  // Handle adding new address
  const handleAddNew = async (newData) => {
    setloading(true);
    try {
      const response =await axiosInstance.post(
        `/Address/Add`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        }
      );
      if(response.data.statusCode==200){
        toast.success("Address edited successfully")
      }else{
        toast.error("issue in editing address")
      }
      FetchAdddress();
      setaddress(data);
      reset();
      setisaddingnew(false);
    } catch (error) {
      console.error("Error adding new address:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="p-4 w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#0E0E25]">Manage Addresses</h2>

      {/* Address List */}
      {data?.map((addr) => (
        <div
          key={addr.id}
          className={`border p-3 rounded-md mb-3 ${
            selectedAddress?.id === addr.id
              ? "border-[#0E0E25] border-[4px]"
              : "border-gray-300"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{addr.contactName}</p>
              <p className="text-sm text-gray-600">{addr.street}</p>
              <p className="text-sm text-gray-600">📞 {addr.contactNumber}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSelect({ ...addr })}
                className="px-3 py-1 text-sm bg-[#0E0E25] text-white rounded-md"
              >
                Select
              </button>
              <button
                onClick={() => handleEdit({ ...addr })}
                className="px-3 py-1 text-sm bg-[#004d99] text-white rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Address Form */}
      {isAdding && (
        <div className="border p-4 rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Edit Address</h3>
          <form onSubmit={handleSubmit(handleSaveEdit)}>
            <input
              {...register("street", {
                required: "Street is required",
                maxLength: { value: 100, message: "Street name can't exceed 100 characters" },
              })}
              defaultValue={editingAddress?.street}
              placeholder="Street"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.street && <p className="text-red-500">{errors.street.message}</p>}

            <input
              {...register("city", {
                required: "City is required",
                maxLength: { value: 50, message: "City name can't exceed 50 characters" },
              })}
              defaultValue={editingAddress?.city}
              placeholder="City"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}

            <input
              {...register("state", {
                required: "State is required",
                maxLength: { value: 50, message: "State name can't exceed 50 characters" },
              })}
              defaultValue={editingAddress?.state}
              placeholder="State"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.state && <p className="text-red-500">{errors.state.message}</p>}

            <input
              {...register("postalCode", {
                required: "Postal Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Postal Code must be exactly 6 digits",
                },
              })}
              defaultValue={editingAddress?.postalCode}
              placeholder="Postal Code"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}

            <input
              {...register("buildingName", {
                maxLength: { value: 100, message: "Building name can't exceed 100 characters" },
              })}
              defaultValue={editingAddress?.buildingName}
              placeholder="Building Name"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.buildingName && <p className="text-red-500">{errors.buildingName.message}</p>}

            <input
              {...register("contactName", {
                required: "Contact Name is required",
                maxLength: { value: 50, message: "Contact name can't exceed 50 characters" },
              })}
              defaultValue={editingAddress?.contactName}
              placeholder="Contact Name"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.contactName && <p className="text-red-500">{errors.contactName.message}</p>}

            <input
              {...register("contactNumber", {
                required: "Contact Number is required",
                pattern: {
                  value: /^\+?[1-9]\d{9,14}$/,
                  message: "Invalid contact number format",
                },
              })}
              defaultValue={editingAddress?.contactNumber}
              placeholder="Contact Number"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}

            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
              Save
            </button>
          </form>
        </div>
      )}

      {/* New Address Form */}
      {isaddingnew ? (
        <div className="border p-4 rounded-md bg-gray-100 mt-3">
          <h3 className="text-lg font-semibold mb-2">New Address</h3>
          <form onSubmit={handleSubmit(handleAddNew)}>
            <input
              {...register("street", {
                required: "Street is required",
                maxLength: { value: 100, message: "Street name can't exceed 100 characters" },
              })}
              placeholder="Street"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.street && <p className="text-red-500">{errors.street.message}</p>}

            <input
              {...register("city", {
                required: "City is required",
                maxLength: { value: 50, message: "City name can't exceed 50 characters" },
              })}
              placeholder="City"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}

            <input
              {...register("state", {
                required: "State is required",
                maxLength: { value: 50, message: "State name can't exceed 50 characters" },
              })}
              placeholder="State"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.state && <p className="text-red-500">{errors.state.message}</p>}

            <input
              {...register("postalCode", {
                required: "Postal Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Postal Code must be exactly 6 digits",
                },
              })}
              placeholder="Postal Code"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}

            <input
              {...register("buildingName", {
                maxLength: { value: 100, message: "Building name can't exceed 100 characters" },
              })}
              placeholder="Building Name"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.buildingName && <p className="text-red-500">{errors.buildingName.message}</p>}

            <input
              {...register("contactName", {
                required: "Contact Name is required",
                maxLength: { value: 50, message: "Contact name can't exceed 50 characters" },
              })}
              placeholder="Contact Name"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.contactName && <p className="text-red-500">{errors.contactName.message}</p>}

            <input
              {...register("contactNumber", {
                required: "Contact Number is required",
                pattern: {
                  value: /^\+?[1-9]\d{9,14}$/,
                  message: "Invalid contact number format",
                },
              })}
              placeholder="Contact Number"
              className="w-full p-2 mb-2 border rounded"
            />
            {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}

            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
              Save
            </button>
            <button
              onClick={() => setisaddingnew(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setisaddingnew(true)}
          className="w-full p-2 bg-[#0E0E25] text-white rounded-md mt-3"
        >
          + Add New
        </button>
      )}
    </div>
  );
};

export default AddressManager;
