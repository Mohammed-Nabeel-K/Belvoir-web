"use client"
import React, { useState } from "react";

const AddressManager = ({handleSubmit,selectedAddress,setSelectedAddress}) => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "John Doe", address: "123 Main St, City A", phone: "9876543210" },
    { id: 2, name: "Jane Smith", address: "456 Elm St, City B", phone: "9876543220" }
  ]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({ name: "", address: "", phone: "" });
  const [isAdding, setIsAdding] = useState(false);

  // Handle selecting an address
  const handleSelect = (id) => setSelectedAddress(id);

  // Handle editing an address
  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsAdding(false);
  };

  // Handle saving edited address
  const handleSaveEdit = () => {
    setAddresses(addresses.map(addr => addr.id === editingAddress.id ? editingAddress : addr));
    setEditingAddress(null);
  };

  // Handle adding a new address
  const handleAddNew = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.phone) return;
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    setNewAddress({ name: "", address: "", phone: "" });
    setIsAdding(false);
  };

 

  return (
    <div className="p-4 max-w-xl mx-auto block m-auto">
      <h2 className="text-xl font-bold mb-4">Manage Addresses</h2>

      {/* Address List */}
      {addresses.map((addr) => (
        <div key={addr.id} className={`border p-3 rounded-md mb-3 ${selectedAddress === addr.id ? "border-blue-500 border-[4px]" : "border-gray-300"}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm text-gray-600">{addr.address}</p>
              <p className="text-sm text-gray-600">📞 {addr.phone}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleSelect(addr.id)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md">Select</button>
              <button onClick={() => handleEdit(addr)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md">Edit</button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Address Form */}
      {editingAddress && (
        <div className="border p-4 rounded-md bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Edit Address</h3>
          <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Name"
            value={editingAddress.name} onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })} />
          <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Address"
            value={editingAddress.address} onChange={(e) => setEditingAddress({ ...editingAddress, address: e.target.value })} />
          <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Phone"
            value={editingAddress.phone} onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })} />
          <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
        </div>
      )}
      <button onClick={()=>handleSubmit()} className="w-full p-2 bg-blue-600 text-white rounded-md mt-3">Deliver Here</button>
        {/* New Address Form */}
      {isAdding ? (
        <div className="border p-4 rounded-md bg-gray-100 mt-3">
          <h3 className="text-lg font-semibold mb-2">New Address</h3>
          <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Name"
            value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
          <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Address"
            value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
          <input type="text" className="w-full p-2 mb-2 border rounded" placeholder="Phone"
            value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} />
          <button onClick={handleAddNew} className="px-4 py-2 bg-green-500 text-white rounded-md mr-2">Save</button>
          <button onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="w-full p-2 bg-blue-600 text-white rounded-md mt-3">+ Add New</button>
      )}
    </div>
  );
};

export default AddressManager;
