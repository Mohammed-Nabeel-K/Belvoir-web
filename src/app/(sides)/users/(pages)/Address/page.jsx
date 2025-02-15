"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import Navbar from "../../components/ui/navbar/Navbar";
import { Loader } from "lucide-react";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchAddresses();
  }, []);

  
  // Fetch addresses from API
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/Address/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userData")}`,
        },
      });
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add or Edit Address
  const handleSave = async (data) => {
    setLoading(true);
    try {
      if (selectedAddress) {
        // Edit address
        await axiosInstance.put(`/Address/${selectedAddress.id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        });
        toast.success("Address updated successfully");
      } else {
        // Add new address
        await axiosInstance.post("/Address/Add", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        });
        toast.success("Address added successfully");
      }
      fetchAddresses();
      closeModal();
    } catch (error) {
      toast.error("Error saving address");
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Address
  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/Address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userData")}`,
        },
      });
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error) {
      toast.error("Error deleting address");
      console.error("Error deleting address:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open Modal
  const openModal = (address = null) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
    reset(address || {});
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
    reset();
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center mx-auto  h-screen w-full">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-2xl mb-9 text-[#0E0E25] w-max block mx-auto">
            Manage Address
          </h2>

          {/* Address List */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {addresses?.map((address) => (
              <div
                key={address.id}
                className="bg-white shadow-custom p-6 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-lg flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />{" "}
                    {address.contactName}
                  </h3>
                  <p className="text-gray-600">
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.postalCode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <FaEdit
                    className="text-xl cursor-pointer hover:text-blue-500"
                    onClick={() => openModal(address)}
                  />
                  <FaTrash
                    className="text-xl cursor-pointer hover:text-red-500"
                    onClick={() => deleteAddress(address.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add New Address Button */}
          <button
            onClick={() => openModal()}
            className="mt-6 bg-[#0E0E25] text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-blue-600"
          >
            <FaPlus /> Add New Address
          </button>

          {/* Address Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                  {selectedAddress ? "Edit Address" : "Add New Address"}
                </h2>
                <form onSubmit={handleSubmit(handleSave)}>
                  <input
                    {...register("contactName", {
                      required: "Contact Name is required",
                    })}
                    placeholder="Contact Name"
                    className="w-full p-2 border rounded mb-2"
                  />
                  {errors.contactName && (
                    <p className="text-red-500">{errors.contactName.message}</p>
                  )}

                  <input
                    {...register("street", { required: "Street is required" })}
                    placeholder="Street"
                    className="w-full p-2 border rounded mb-2"
                  />
                  {errors.street && (
                    <p className="text-red-500">{errors.street.message}</p>
                  )}

                  <input
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    {...register("state", { required: "State is required" })}
                    placeholder="State"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    {...register("postalCode", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Postal Code must be 6 digits",
                      },
                    })}
                    placeholder="Postal Code"
                    className="w-full p-2 border rounded mb-2"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500">{errors.postalCode.message}</p>
                  )}

                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Save
                  </button>
                </form>
                <button
                  onClick={closeModal}
                  className="mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Address;

