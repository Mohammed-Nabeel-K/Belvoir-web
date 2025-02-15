"use client";

import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import React, {use, useEffect, useState } from "react";

const Page = ({ params }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/Admin/user/id/${id}`);
        setUser(res.data.data);

        // Fetch user orders (assuming there's an endpoint for it)
        const orderRes = await axiosInstance.get(`/Admin/user/orders/${id}`);
        setOrders(orderRes.data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl font-sans mx-auto my-10 p-8 bg-white shadow-lg rounded-xl">
      {/* User Details */}
      <div className="mb-8 p-4">
        <h1 className="text-4xl  font-bold text-yellow-800">{user.name}</h1>
        <p className="text-lg  text-gray-600 mt-2">ID: <span className="font-semibold">{user.id}</span></p>
        <p className="text-lg text-gray-600 mt-2">Email: <span className="font-semibold">{user.email}</span></p>
        <p className="text-lg text-gray-600 mt-2">Phone: <span className="font-semibold">{user.phone}</span></p>
      </div>

      {/* Order Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 ml-3 text-gray-700">Order Details</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg shadow-sm bg-gray-100 ml-3">
                <p className="text-lg font-medium text-gray-800">Order ID: {order.id}</p>
                <p className="text-gray-600">Amount: <span className="font-semibold">${order.amount}</span></p>
                <p className="text-gray-600">Status: <span className={`font-semibold ${order.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{order.status}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 ml-3">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
