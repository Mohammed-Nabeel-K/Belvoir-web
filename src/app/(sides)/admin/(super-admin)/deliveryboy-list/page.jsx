"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddDeleveryBoy,
  UseBlockOrUnblockDeleveryBoy,
  useDeleteDeleveryBoy,
  UsefetchAlldeleveryBoys,
} from "../../../../../hooks/deleveryBoyHook";

const DeliveryBoyListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newDeleveryBoy, setnewDeleveryBoy] = useState({
    name: "",
    email: "",
    passwordHash: "",
    phone: "",
    licenceNo: "",
    vehicleNo: "",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const { data, refetch, isLoading } = UsefetchAlldeleveryBoys(page, limit, searchQuery);
  const { mutate: deleveryBoyBlockOrUnblock } = UseBlockOrUnblockDeleveryBoy();
  const { mutate: addDeleveryBoy } = useAddDeleveryBoy();
  const { mutate: deleteDeleveryBoy } = useDeleteDeleveryBoy();

  const totalDeleveryBoys = data?.data?.count.usercount;
  const totalPages = Math.ceil(totalDeleveryBoys / limit);
  const active = data?.data?.count.activeusercount;
  const blocked = data?.data?.count.blockedusercount;

  const toggleStatus = (id) => {
    deleveryBoyBlockOrUnblock(id, {
      onSuccess: () => {
        toast.success("Status updated successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to update status.");
      },
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      refetch();
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    refetch();
  }, [page, searchQuery]);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setnewDeleveryBoy((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDeleverySubmit = (e) => {
    e.preventDefault();
    addDeleveryBoy(newDeleveryBoy, {
      onSuccess: () => {
        toast.success("Delivery boy added successfully!");
        setAddModalOpen(false);
        setnewDeleveryBoy({
          name: "",
          passwordHash: "",
          email: "",
          phone: "",
          licenceNo: "",
          vehicleNo: "",
        });
        refetch();
      },
      onError: () => {
        toast.error("Failed to add delivery boy.");
      },
    });
  };

  const handleDelete = (id) => {
    deleteDeleveryBoy(id, {
      onSuccess: () => {
        toast.success("Delivery boy deleted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete delivery boy.");
      },
    });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
       

        {isLoading ? (
          
          <div className="flex justify-center items-center mt-[300px]">
            <div className="load-row flex space-x-2">
              <span className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"></span>
              <span className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-4 h-4 bg-blue-300 rounded-full animate-bounce delay-300"></span>
              <span className="w-4 h-4 bg-blue-200 rounded-full animate-bounce delay-450"></span>
            </div>
          </div>
        ) : (
          <>

<div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Delivery Boy List</h1>
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleSearchEnter}
              placeholder="Search delivery boys..."
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300"
            >
              + Add New
            </button>
          </div>
        </div>
            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-bold text-gray-800">Total Delivery Boys</h3>
                <p className="text-3xl font-semibold text-gray-900">{totalDeleveryBoys}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-bold text-gray-800">Active</h3>
                <p className="text-3xl font-semibold text-green-500">{active}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-bold text-gray-800">Blocked</h3>
                <p className="text-3xl font-semibold text-red-500">{blocked}</p>
              </div>
            </div>
            {data?.data?.data?.length === 0 && !isLoading && (
                <div className="text-center text-xl text-gray-600">
                  <p>No delivery boy found.</p>
                </div>
              )}



            
            {data?.data?.data?.length > 0 && !isLoading && (

            <div className="overflow-x-auto bg-white p-8 rounded-xl shadow-sm border border-gray-300">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-3 px-6 border border-gray-300 text-left font-semibold">Name</th>
                    <th className="py-3 px-6 border border-gray-300 text-left font-semibold">Email</th>
                    <th className="py-3 px-6 border border-gray-300 text-left font-semibold">Phone</th>
                    <th className="py-3 px-6 border border-gray-300 text-center font-semibold">Block</th>
                    <th className="py-3 px-6 border border-gray-300 text-center font-semibold">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.data?.map((deleveryBoy) => (
                    <tr
                      key={deleveryBoy.id}
                      className="border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelected(deleveryBoy)}
                    >
                      <td className="py-3 px-6 border border-gray-300 font-medium text-gray-800">
                        {deleveryBoy.name}
                      </td>
                      <td className="py-3 px-6 border border-gray-300 text-gray-600">
                        {deleveryBoy.email}
                      </td>
                      <td className="py-3 px-6 border border-gray-300 text-gray-600">
                        {deleveryBoy.phone}
                      </td>
                      <td className="py-3 px-6 border border-gray-300 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(deleveryBoy.id);
                          }}
                          className="px-6 py-2 rounded-lg text-white bg-yellow-600 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                        >
                          {deleveryBoy.isBlocked ? "Activate" : "Block"}
                        </button>
                      </td>
                      <td className="py-3 px-6 border border-gray-300 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(deleveryBoy.id);
                          }}
                          className="px-6 py-2 rounded-lg text-white bg-yellow-600 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>)}

            
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </>
        )}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Delivery Boy</h2>
              <form onSubmit={handleAddDeleverySubmit}>
                <div className="space-y-4">
                  {Object.keys(newDeleveryBoy).map((field) => (
                    <div key={field}>
                      <label className="block text-gray-700 font-medium capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={newDeleveryBoy[field]}
                        onChange={handleAddInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

    
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Boy Details</h2>
              <div className="space-y-2">
                <p>
                  <strong>ID:</strong> {selected.id}
                </p>
                <p>
                  <strong>Name:</strong> {selected.name}
                </p>
                <p>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selected.phone}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoyListPage;
