"use client";

import React, { useState } from "react";
import {
  UseBlockOrUnblockUser,
  UsefetchAllUsers,
} from "../../../../../hooks/usersHooks";

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users = [], isLoading, isError, error } = UsefetchAllUsers();

  const { mutate: userBlockOrUnblock } = UseBlockOrUnblockUser();

  const toggleStatus = (id) => {
    console.log("workin", id);
    userBlockOrUnblock(id, {
      onSuccess: (data) => {
        console.log( data);
      },
      onError: (error) => {
        console.log( error);
      },
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error fetching users: {error.message}</div>;

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-700">User List</h1>

          <div className="flex items-center gap-4">
          
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search users..."
              className="px-12 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        
        <div className="flex justify-between gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">
              Total Users
            </h3>
            <p className="text-3xl font-semibold text-gray-900">
              {users.data?.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">
              Active Users
            </h3>
            <p className="text-3xl font-semibold text-green-500">
              {users.data?.filter((user) => !user.isBlocked).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold text-gray-800 tracking-wide">
              Blocked Users
            </h3>
            <p className="text-3xl font-semibold text-red-500">
              {users.data?.filter((user) => user.isBlocked).length}
            </p>
          </div>
        </div>

      
        <div className="overflow-x-auto bg-white p-8 rounded-2xl shadow-2xl">
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-left text-lg font-semibold">
                  Si No.
                </th>
                <th className="py-3 px-6 text-left text-lg font-semibold">
                  Username
                </th>
                <th className="py-3 px-6 text-left text-lg font-semibold">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-lg font-semibold">
                  Phone Number
                </th>
                <th className="py-3 px-6 text-center text-lg font-semibold">
                  Block
                </th>
              </tr>
            </thead>
            <tbody>
              {users.data
                .filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{user.email}</td>
                    <td className="py-3 px-6 text-gray-600">{user.phone}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-opacity-80 transition-all duration-300 shadow-lg"
                      >
                        {user.isBlocked ? "Activate" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
