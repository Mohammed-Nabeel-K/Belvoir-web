"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";

const AddressManager = ({
  handleSubmit,
  selectedAddress,
  setSelectedAddress,
  data,
  setaddress,
  FetchAdddress,
  loading,
  setloading,
}) => {
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    buildingName: "",
    contactName: "",
    contactNumber: "",
  });  const [isAdding, setIsAdding] = useState(false);
  const [isaddingnew, setisaddingnew] = useState(false)
  // Handle selecting an address
  const handleSelect = (data) => {
    setSelectedAddress(data)
  };

  // Handle editing an address
  const handleEdit = (data) => {
    setEditingAddress(data);
    setIsAdding(true);
  };

  
  // Handle saving edited address
  const handleSaveEdit = async (id) => {
    setloading(true);
    await axiosInstance.put(
      `/Address/${id}`,
      {
        street: editingAddress?.street,
        city: editingAddress?.city,
        state: editingAddress.state,
        postalCode: editingAddress.postalCode,
        buildingName: editingAddress.buildingName,
        contactName: editingAddress.contactName,
        contactNumber: editingAddress.contactNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userData")}`,
        },
      }
    );
    FetchAdddress();
    setaddress(data);
    setIsAdding(false);
    setEditingAddress(null);
  };

  const handleAddNew = async () => {
    setloading(true);
    try {
      await axiosInstance.post(
        `/Address/Add`,
        {
          street: newAddress.street,
          city: newAddress.city,
          state: newAddress.state,
          postalCode: newAddress.postalCode,
          buildingName: newAddress.buildingName,
          contactName: newAddress.contactName,
          contactNumber: newAddress.contactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        }
      );
      
      FetchAdddress();
      setaddress(data);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        buildingName: "",
        contactName: "",
        contactNumber: "",
      });
      setisaddingnew(false);
    } catch (error) {
      console.error("Error adding new address:", error);
    } finally {
      setloading(false);
    }
  };
 
  
  return (
    <div className="p-4 max-w-xl mx-auto block m-auto">
      <h2 className="text-xl font-bold mb-4">Manage Addresses</h2>

      {/* Address List */}
      {data?.map((addr) => (
        <div
          key={addr.id}
          className={`border p-3 rounded-md mb-3 ${
            selectedAddress?.id === addr.id
              ? "border-blue-500 border-[4px]"
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
                onClick={() => handleSelect({...addr})}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md cursor-pointer"
              >
                Select
              </button>
              <button
                onClick={() => handleEdit({ ...addr })}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md cursor-pointer"
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

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Street"
            value={editingAddress?.street || ""}
            onChange={(e) =>
              setEditingAddress({ ...editingAddress, street: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="City"
            value={editingAddress?.city || ""}
            onChange={(e) =>
              setEditingAddress({ ...editingAddress, city: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="State"
            value={editingAddress?.state || ""}
            onChange={(e) =>
              setEditingAddress({ ...editingAddress, state: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Postal Code"
            value={editingAddress?.postalCode || " "}
            onChange={(e) =>
              setEditingAddress({
                ...editingAddress,
                postalCode: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Building Name"
            value={editingAddress?.buildingName || ""}
            onChange={(e) =>
              setEditingAddress({
                ...editingAddress,
                buildingName: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Contact Name"
            value={editingAddress?.contactName || ""}
            onChange={(e) =>
              setEditingAddress({
                ...editingAddress,
                contactName: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Contact Number"
            value={editingAddress?.contactNumber || ""}
            onChange={(e) =>
              setEditingAddress({
                ...editingAddress,
                contactNumber: e.target.value,
              })
            }
          />

          <button
            onClick={() => handleSaveEdit(editingAddress.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      )}
      <button
        onClick={() => handleSubmit()}
        className="w-full p-2 bg-blue-600 text-white rounded-md mt-3"
      >
        Deliver Here
      </button>
      {/* New Address Form */}
      {isaddingnew ? (
        <div className="border p-4 rounded-md bg-gray-100 mt-3">
          <h3 className="text-lg font-semibold mb-2">New Address</h3>

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Street"
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="City"
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="State"
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Postal Code"
            onChange={(e) =>
              setNewAddress({ ...newAddress, postalCode: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Building Name"
            onChange={(e) =>
              setNewAddress({ ...newAddress, buildingName: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Contact Name"
            onChange={(e) =>
              setNewAddress({ ...newAddress, contactName: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Contact Number"
            onChange={(e) =>
              setNewAddress({ ...newAddress, contactNumber: e.target.value })
            }
          />

          <button
            onClick={()=>handleAddNew()}
            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
          >
            Save
          </button>

          <button
            onClick={() => setisaddingnew(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setisaddingnew(true)}
          className="w-full p-2 bg-blue-600 text-white rounded-md mt-3"
        >
          + Add New
        </button>
      )}
    </div>
  );
};

export default AddressManager;
