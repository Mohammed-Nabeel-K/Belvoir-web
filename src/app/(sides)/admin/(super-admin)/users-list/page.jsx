"use client";

import React, { useState, useEffect } from "react";
import {
  UseBlockOrUnblockUser,
  UsefetchAllUsers,
} from "../../../../../hooks/usersHooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import LoadingUi from "../../../users/components/ui/loading/loadingui";

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const router = useRouter();

  const { data, refetch, isFetching } = UsefetchAllUsers(
    limit,
    page,
    searchQuery,
    ""
  );
  const { mutate: userBlockOrUnblock } = UseBlockOrUnblockUser();

  const totalUsers = data?.data?.count.usercount;
  const totalPages = Math.ceil(totalUsers / limit);
  const activeUsers = data?.data?.count.activeusercount;
  const blockedUsers = data?.data?.count.blockedusercount;

  const toggleStatus = (id) => {
    userBlockOrUnblock(id, {
      onSuccess: (data) => {
        refetch();
        toast.success(
          `User ${data?.isBlocked ? "activated" : "blocked"} successfully!`
        );
      },
      onError: (error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      },
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      setPage(1);
      refetch();
    }
  };

  const handleRowClick = (user) => {
    router.push(`/admin/users-list/${user.id}`);
    // setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsLoading(true);
    }
    refetch().finally(() => {
      setIsLoading(false);
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
    });
  }, [page, searchQuery]);

  return (
    <>
      <ToastContainer />
      {(isLoading || isFetching) && isFirstLoad ? (
        <LoadingUi />
      ) : (
        <div className="p-8  h-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-700">User List</h1>
              <input
                type="text"
                onChange={handleSearch}
                onKeyDown={handleSearchEnter}
                value={searchQuery}
                placeholder="Search users..."
                className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border">
                <h3 className="text-xl font-bold text-gray-800">Total Users</h3>
                <p className="text-3xl font-semibold text-gray-900">
                  {totalUsers}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg  text-center border">
                <h3 className="text-xl font-bold text-gray-800">
                  Active Users
                </h3>
                <p className="text-3xl font-semibold text-green-500">
                  {activeUsers}
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center border">
                <h3 className="text-xl font-bold text-gray-800">
                  Blocked Users
                </h3>
                <p className="text-3xl font-semibold text-red-500">
                  {blockedUsers}
                </p>
              </div>
            </div>
            <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              {data?.data?.data?.length === 0 ? (
                <div className="text-center text-xl font-semibold text-gray-700">
                  User not found
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                    <tr className="text-left">
                      <th className="py-4 px-6 font-medium text-lg">
                        Username
                      </th>
                      <th className="py-4 px-6 font-medium text-lg">Email</th>
                      <th className="py-4 px-6 font-medium text-lg">
                        Phone Number
                      </th>
                      <th className="py-4 px-6 font-medium text-lg text-center">
                        Block
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.data?.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`border-b border-gray-300 hover:bg-gray-100 transition-all ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                        onClick={() => handleRowClick(user)}
                      >
                        <td className="py-4 px-6 text-gray-700 font-medium">
                          {user.name}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          {user.phone}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStatus(user.id);
                            }}
                            className={`px-5 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ${
                              user.isBlocked
                                ? "bg-yellow-600 hover:bg-yellow-00"
                                : "bg-yellow-600 hover:bg-yellow-00"
                            }`}
                          >
                            {user.isBlocked ? "Activate" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {data?.data?.data?.length > 0 && (
              <div className="flex justify-between items-center mt-4 space-x-4 md:space-x-8">
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserListPage;
