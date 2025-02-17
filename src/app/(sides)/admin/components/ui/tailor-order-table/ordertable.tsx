"use client";
import type React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";

interface Order {
  id: number;
  name: string;
  date: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  deadline: string;
}

// Status color mapping for consistent styling
const statusStyles = {
  Shipped: "text-blue-600 ",
  Delivered: "text-green-600 ",
  Pending: "text-yellow-600 ",
  Picked: "text-gray-500",
};

const OrderTable: React.FC<{ height?: string }> = ({
  height = "h-[350px]",
}) => {
  const [data, setdata] = useState<any | []>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosInstance.get("/Delivery/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
        });
        setdata(response.data.data.deliveryOrders);
      } catch (error) {
        console.log("error in fetching delvery dashboard data", error);
      }
    };
    fetchdata();
  }, []);
  // Sample order data

  return (
    <div className="p-4 w-full overflow-hidden">
      <div className={`${height} overflow-y-auto space-y-3`}>
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 p-4 rounded-lg bg-gray-50 text-sm font-medium text-gray-600 shadow-md ">
          <div>Customer</div>
          <div>Date</div>
          <div>Status</div>
          <div>Deadline</div>
          {/* <div>Actions</div> */}
        </div>

        {/* Orders list */}
        <div className="space-y-2">
          {data?.map((order: any, i: string) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>{order.customerName}</div>
              <div>
                {new Date(order.order_date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.order_status === "Delivered"
                      ? "text-green-600"
                      : order.order_status === "Picked"
                      ? "text-gray-500"
                      : order.order_status === "Cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.order_status}
                </span>
              </div>

              <div>
                {" "}
                {new Date(order.deadline).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              {/* <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded-md hover:bg-white hover:text-slate-900 transition-colors">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-slate-900 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  View
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
