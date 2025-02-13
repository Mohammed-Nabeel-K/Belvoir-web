import Link from "next/link";
import React from "react";

// Status color mapping for consistent styling
const statusStyles = {
  shipped: "text-blue-600",
  delivered: "text-green-600",
  cancelled: "text-red-600",
  pending: "text-yellow-600",
};
const formatDate = (isoDate) => {
  return new Date(isoDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
const OrderTable = ({ data }) => {
  return (
    <div className="p-4 w-full overflow-hidden">
      <div className={` overflow-y-auto space-y-3`}>
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 p-4 rounded-lg bg-gray-50 text-sm font-medium text-gray-600 shadow-md">
          <div>Customer</div>
          <div>Date</div>
          <div>Status</div>
          <div>Deadline</div>
          <div>Actions</div>
        </div>

        {/* Orders list */}
        <div className="space-y-2">
          {data?.map((order) => (
            <Link href={"/admin/order-details/1"}>
              <div
                key={order.id}
                className="grid grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div>{order.customerName}</div>
                <div>{formatDate(order.order_date)}</div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusStyles[order.order_status]
                    }`}
                  >
                    {order.order_status}
                  </span>
                </div>
                <div>{order.deadline}</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded-md hover:bg-white hover:text-slate-900 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-slate-900 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
