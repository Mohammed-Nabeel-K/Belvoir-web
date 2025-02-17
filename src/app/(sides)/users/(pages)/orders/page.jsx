"use client";
import { useEffect, useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";
import Navbar from "../../components/ui/navbar/Navbar";
import axiosInstance from "../../../../../../axios/axiosinstance/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../../components/ui/Loader";
import Image from "next/image";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalOrders, setRentalOrders] = useState([]);
  const [tailorOrders, setTailorOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orderType, setOrderType] = useState("rental"); 

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          orderType === "rental" ? "/Order/user/rental" : "/Order/user/tailor",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userData")}`,
            },
            params: {
              status: selectedStatus,
            },
          }
        );

        if (orderType === "rental") {
          setRentalOrders(response.data.data);
        } else {
          setTailorOrders(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
        if (error.response?.status === 401) {
          toast.error("Please login");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [selectedStatus, orderType]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl text-[#0E0E25]">Your Orders</h2>
            <select
              className="p-2 px-3 rounded border border-[#0E0E25] text-[#0E0E25]"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${orderType === "rental" ? "bg-black text-white" : "bg-gray-200"}`}
              onClick={() => setOrderType("rental")}
            >
              Rental Orders
            </button>
            <button
              className={`px-4 py-2 rounded ${orderType === "tailor" ? "bg-black text-white" : "bg-gray-200"}`}
              onClick={() => setOrderType("tailor")}
            >
              Tailor Orders
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(orderType === "rental" ? rentalOrders : tailorOrders)?.map((order, i) => (
              <div
                key={i}
                className="bg-white text-gray-600 shadow-custom p-6 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg transition w-full"
                onClick={() => openModal(order)}
              >
                <Image
                  src={orderType === "rental" ? order.rentalImage : order.designImage}
                  width={50}
                  height={50}
                  className="size-15"
                  alt=""
                />
                <div className="w-full">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaBox className="text-blue-500" /> Order #{order.order_id}
                  </h3>
                  <p className="mt-3">Date: {new Date(order.order_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>Total: {order.price}</p>
                  <span
                    className={`float-right w-max mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm ${
                      order.order_status === "Delivered"
                        ? "bg-green-500"
                        : order.order_status === "Shipped"
                        ? "bg-blue-500"
                        : order.order_status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.order_status === "Delivered" && <FaCheckCircle />}
                    {order.order_status === "Shipped" && <FaTruck />}
                    {order.order_status === "Pending" && <FaClock />}
                    {order.order_status === "Cancelled" && <FaTimesCircle />}
                    {order.order_status}
                  </span>
                </div>
                <FaInfoCircle className="hover:text-black text-xl" />
              </div>
            ))}
            {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-[90%] shadow-lg sm:w-96">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <Image
                  src={orderType === "rental" ? selectedOrder.rentalImage : selectedOrder.designImage}
                  width={90}
                  height={90}
                  className="size-25 block mx-auto"
                  alt=""
                />
                <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                <p><strong>Total:</strong> {selectedOrder.price}</p>
                <button
                  className="mt-4 bg-[#0E0E25] text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
