"use client";

import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import React, { useEffect, use,useState } from "react";
import { useRouter } from "next/navigation";
import LoadingUi from "../../../../users/components/ui/loading/loadingui";

const Page = ({ params }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/Admin/user/id/${id}`);
        setUser(res.data.data);

        const orderRes = await axiosInstance.get(`/Admin/user/orders/${id}`);
        setOrders(orderRes.data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log(user)

  if (!user) {
    return <LoadingUi />;
  }

  return (
    <div className="max-w-4xl font-sans mx-auto my-10 p-8 bg-white shadow-lg rounded-xl relative">
      {/* User Details */}
      <div className="mb-8 p-5 space-y-4">
      <p className="text-lg text-gray-600 mt-2">
        Name: <span className="text-2xl font-bold text-yellow-800">{user.name}</span>
        </p>
        <p className="text-lg text-gray-600 mt-2">
          ID: <span className="font-semibold">{user.id}</span>
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Email: <span className="font-semibold">{user.email}</span>
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Phone: <span className="font-semibold">{user.phone}</span>
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Status: {user.isBlocked?<span className="font-semibold">Blocked</span>:<span className="font-semibold">Active</span>}
        </p>
      </div>

      {/* Order Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 ml-3 text-gray-700">Order Details</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg shadow-sm bg-gray-100 ml-3">
                <p className="text-lg font-medium text-gray-800">Order ID: {order.id}</p>
                <p className="text-gray-600">
                  Amount: <span className="font-semibold">${order.amount}</span>
                </p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Completed" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 ml-3">No orders found.</p>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed bottom-12 right-8 bg-black text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
      >
         Back
      </button>
    </div>
  );
};

export default Page;
