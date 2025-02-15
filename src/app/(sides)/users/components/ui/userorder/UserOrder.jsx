import { useState } from "react";
import { FaBox, FaCheckCircle, FaTimesCircle, FaTruck, FaInfoCircle } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      date: "2024-02-10",
      status: "Delivered",
      items: ["Laptop", "Wireless Mouse"],
      total: "$1200",
    },
    {
      id: 102,
      date: "2024-02-12",
      status: "Shipped",
      items: ["Headphones"],
      total: "$150",
    },
    {
      id: 103,
      date: "2024-02-14",
      status: "Cancelled",
      items: ["Smartwatch"],
      total: "$300",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with order details
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-[#0E0E25] font-bold mb-4">Your Orders</h2>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gradient-to-r from-[#0E0E25] to-purple-500 text-white shadow-md p-6 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg transition w-[240px]"
            onClick={() => openModal(order)}
          >
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaBox className="text-blue-500" /> Order #{order.id}
              </h3>
              <p className="mt-3">Date: {order.date}</p>
              <p className="">Total: {order.total}</p>
              <span
                className={` mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm ${
                  order.status === "Delivered"
                    ? "bg-green-500"
                    : order.status === "Shipped"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              >
                {order.status === "Delivered" && <FaCheckCircle />}
                {order.status === "Shipped" && <FaTruck />}
                {order.status === "Cancelled" && <FaTimesCircle />}
                {order.status}
              </span>
            </div>
            <FaInfoCircle className=" hover:text-black text-xl" />
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className="mb-2">
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <p className="mb-2">
              <strong>Total:</strong> {selectedOrder.total}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white ${
                  selectedOrder.status === "Delivered"
                    ? "bg-green-500"
                    : selectedOrder.status === "Shipped"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p className="mb-2">
              <strong>Items:</strong> {selectedOrder.items.join(", ")}
            </p>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
