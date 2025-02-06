"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import Image from "next/image";
import Profileui from '../../../(super-admin)/components/shimmerui/profileui'








const ProfilePage = () => {
  const [status,setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [tailordata, setTailorData] = useState({});

const fetchTailorProfile = async () => {

  setStatus('loading');

  try {
    const token = localStorage.getItem("userData");

    if (!token) {
      console.error("no token found");
    }

console.log(token)

    const response = await axiosInstance.get("/Tailor/tailorprofile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    setTailorData(response.data.data);

    
  } catch (error) {
    
    console.error("error", error);
    
  }

  setStatus('success')

};

console.log(tailordata);

  useEffect(() => {
    fetchTailorProfile();
  }, []);

  return (
    // Full-width container with responsive padding
    <div className="w-full p-4 sm:p-6 lg:p-8 bg-gray-50">
      {/* Content wrapper with max-width for larger screens */}
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Profile card */}
        <div className="relative p-4 sm:p-6 bg-white rounded-lg shadow-sm">
          {/* Badge - responsive positioning */}
          <div className="absolute right-4 top-4 px-3 py-1 text-sm bg-green-100 text-green-800 rounded">
            Tailor
          </div>

          {status === "loading" ? (
            <Profileui />
          ) : (
            <div className="flex gap-5">
              
              <div className="flex-shrink-0 w-32 h-32 sm:w-48 sm:h-48 mx-auto sm:mx-0">
                <Image
                  src="/home/nabeel.png"
                  alt="tailor"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
              </div>

              <div className="flex flex-col space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-semibold">
                    {tailordata.name}
                  </h1>
                  <p className="text-gray-600"></p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">{tailordata.email}</p>
                  <p className="text-gray-700">{tailordata.phone}</p>
                  <p className="text-gray-700">{tailordata.experience}</p>
                </div>
              </div>

            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setShowModal(!showModal)}
            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-medium">Change Password</span>
          </button>
        </div>

        <Link
          href="/admin/tailoring/orders"
          className="block bg-white rounded-lg shadow-sm hover:shadow transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Orders</h2>
                <p className="text-gray-600 mt-1">View all orders</p>
              </div>
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </Link>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              {/* Modal content */}

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Password form */}
              <div className="space-y-4 z-auto">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button className="w-full p-3 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

