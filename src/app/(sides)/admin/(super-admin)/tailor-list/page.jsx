"use client";

import React, { useState, useEffect } from "react";
import { useBlockOrUnblockTailor, useFetchAllTailors, useAddTailor, useDeleteTailor,} from "../../../../../hooks/tailorsHook";

const TailorListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newTailor, setNewTailor] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const { data: tailors = [], refetch } = useFetchAllTailors(limit,page,searchQuery,"");
  const { mutate: tailorBlockOrUnblock } = useBlockOrUnblockTailor();
  const { mutate: addTailor } = useAddTailor();
  const { mutate: deleteTailor } = useDeleteTailor();

  const totalTailors = tailors.data?.count.usercount;
  const totalPages = Math.ceil(totalTailors / limit);
  const activeTailors = tailors.data?.count.activeusercount;
  const blockedTailors = tailors.data?.count.blockedusercount;

  const toggleStatus = (id) => {
    tailorBlockOrUnblock(id, {
      onSuccess: (data) => {
        refetch();
      },
      onError: (error) => {
        console.log("Error:", error);
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
    setNewTailor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTailorSubmit = (e) => {
    e.preventDefault();
    addTailor(newTailor, {
      onSuccess: () => {
        setAddModalOpen(false);
        setNewTailor({
          name: "",
          email: "",
          password: "",
          phone: "",
          experience: "",
        });
        refetch();
      },
      onError: (error) => {
        console.log("Error:", error);
      },
    });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
      
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Tailor List</h1>
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleSearchEnter}
              placeholder="Search tailors..."
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300"
            >
              + Add Tailor
            </button>
          </div>
        </div>

        {/*Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold text-gray-800">Total Tailors</h3>
            <p className="text-3xl font-semibold text-gray-900">
              {totalTailors}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold text-gray-800">Active Tailors</h3>
            <p className="text-3xl font-semibold text-green-500">
              {activeTailors}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-bold text-gray-800">Blocked Tailors</h3>
            <p className="text-3xl font-semibold text-red-500">
              {blockedTailors}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white p-8 rounded-xl shadow-sm border border-gray-300">
          <table className="min-w-full table-auto text-gray-700 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 border border-gray-300 text-left font-semibold">
                  Tailor Name
                </th>
                <th className="py-3 px-6 border border-gray-300 text-left font-semibold">
                  Email
                </th>
                <th className="py-3 px-6 border border-gray-300 text-left font-semibold">
                  Phone Number
                </th>
                <th className="py-3 px-6 border border-gray-300 text-center font-semibold">
                  Block
                </th>
                <th className="py-3 px-6 border border-gray-300 text-center font-semibold">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {tailors.data?.data?.map((tailor) => (
                <tr
                  key={tailor.id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedTailor(tailor)}
                >
                  <td className="py-3 px-6 border border-gray-300 font-medium text-gray-800">
                    {tailor.name}
                  </td>
                  <td className="py-3 px-6 border border-gray-300 text-gray-600">
                    {tailor.email}
                  </td>
                  <td className="py-3 px-6 border border-gray-300 text-gray-600">
                    {tailor.phone}
                  </td>
                  <td className="py-3 px-6 border border-gray-300 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(tailor.id);
                      }}
                      className="px-6 py-2 rounded-lg text-white bg-yellow-600 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                    >
                      {tailor.isBlocked ? "Activate" : "Block"}
                    </button>
                  </td>
                  <td className="py-3 px-6 border border-gray-300 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTailor(tailor.id);
                      }}
                      className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

        {/* Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Add New Tailor
              </h2>
              <form onSubmit={handleAddTailorSubmit}>
                <div className="space-y-4">
                  {["name", "email", "password", "phone", "experience"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-gray-700 font-medium capitalize">
                          {field}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={newTailor[field]}
                          onChange={handleAddInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    )
                  )}
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
                    Add Tailor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tailor modal*/}
        {selectedTailor && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-sm w-full max-w-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tailor Details
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>ID:</strong> {selectedTailor.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedTailor.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedTailor.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedTailor.phone}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={()=>setSelectedTailor(null)}
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

export default TailorListPage;
