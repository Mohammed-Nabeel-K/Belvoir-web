import { useState } from "react";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const ManageAddress = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, title: "Home", details: "123 Main Street, New York, NY" },
    { id: 2, title: "Work", details: "456 Business Rd, Los Angeles, CA" },
    { id: 3, title: "Work", details: "456 Business Rd, Los Angeles, CA" },
    { id: 4, title: "Work", details: "456 Business Rd, Los Angeles, CA" },
    { id: 5, title: "Work", details: "456 Business Rd, Los Angeles, CA" },

  ]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected address
  const openModal = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  // Handle address deletion
  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#0E0E25]">Manage Addresses</h2>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-gradient-to-r from-[#0E0E25] to-purple-500 text-white shadow-md p-6 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg transition"
            onClick={() => openModal(address)}
          >
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" /> {address.title}
              </h3>
              <p className="">{address.details}</p>
            </div>
            <FaEdit className=" hover:text-blue-500 text-xl" />
          </div>
        ))}
      </div>
      {/* Add New Address Button */}
      <button className="mt-6  sm:w-max sm:mx-auto  bg-[#0E0E25] text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-blue-600">
        <FaPlus /> Add New Address
      </button>

      {/* Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Address</h2>
            <input
              type="text"
              value={selectedAddress?.title}
              className="w-full border p-2 rounded-lg mb-3"
            />
            <textarea
              className="w-full border p-2 rounded-lg mb-3"
              rows={3}
              value={selectedAddress?.details}
            />
            <div className="flex justify-between">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Save
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => deleteAddress(selectedAddress.id)}
              >
                <FaTrash />
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAddress;
