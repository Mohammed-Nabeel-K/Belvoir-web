"use client";
import React from "react";

const OrderDetails = () => {
  // Dummy order data (Replace with API fetch)
  const order = {
    order_id: "bba1cbe5-def5-11ef-86df-32b126bedf2d",
    customerName: "John Doe",
    order_date: "2025-01-29T10:00:00",
    tailorProductId: "050d5895-deef-11ef-86df-32b126bedf2d",
    order_status: "Pending",
  };

  // Format date
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="h-[90vh] flex items-start">
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-custom rounded-[20px] block m-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Details
        </h2>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Order ID:</strong> {order.order_id}
          </p>
          <p className="text-gray-700">
            <strong>Customer Name:</strong> {order.customerName}
          </p>
          <p className="text-gray-700">
            <strong>Order Date:</strong> {formatDate(order.order_date)}
          </p>
          <p className="text-gray-700">
            <strong>Product ID:</strong> {order.tailorProductId}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span className="text-yellow-600">{order.order_status}</span>
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          onClick={() => router.push("/orders")}
        >
          Back to Orders
        </button>
      </div>
    </section>
  );
};

export default OrderDetails;
