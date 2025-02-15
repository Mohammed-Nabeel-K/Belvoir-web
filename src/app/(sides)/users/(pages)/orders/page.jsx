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
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState();
  const [selectedStatus, setselectedStatus] = useState("")
  // Open modal with order details
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setloading(true);
        const response = await axiosInstance.get("/Order/user/rental", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
          params:{
            status:selectedStatus
          }
        });
        setdata(response.data.data);
      } catch (error) {
        console.log("error in fetching order page data");
        if (error.response.status == 401) {
          toast.error("please login");
          router.push("/login");
        }
      } finally {
        setloading(false);
      }
    };
    fetchOrder();
  }, [selectedStatus]);

  return (
    <>
      <Navbar></Navbar>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="p-6">
          <div className="flex mb-10">
            <h2 className="text-2xl text-[#0E0E25]  mb-4 w-max block mx-auto">
              Your Orders
            </h2>
            <select
              className="p-2 px-3 rounded border-[1px] text-[#0E0E25] border-[#0E0E25]"
              value={selectedStatus || ""}
              onChange={(e)=>setselectedStatus(e.target.value)}
            >
              <option value="" defaultChecked >Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.map((order, i) => (
              <div
                key={i}
                className="bg-white  text-gray-600 shadow-custom p-6 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-lg transition w-full"
                onClick={() => openModal(order)}
              >
                <Image
                  src={order.rentalImage}
                  width={50}
                  height={50}
                  className="size-15"
                  alt=""
                ></Image>
                <div className="w-full">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaBox className="text-blue-500" /> Order #{order.order_id}
                  </h3>
                  <p className="mt-3">
                    Date:{" "}
                    {new Date(order.order_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>{" "}
                  <p className="">Total: {order.price}</p>
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
                <FaInfoCircle className=" hover:text-black text-xl" />
              </div>
            ))}
          </div>

          {/* Order Details Modal */}
          {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-[90%] shadow-lg sm:w-96">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <Image
                  src={selectedOrder.rentalImage}
                  width={90}
                  height={90}
                  className="size-25 block mx-auto"
                  alt=""
                ></Image>
                <p className="mb-2 text-gray-500">
                  <strong>Order ID:</strong> {selectedOrder.order_id}
                </p>
                <p className="mb-2  text-gray-500">
                  <strong>Item</strong> {selectedOrder.title}
                </p>
                <p className="mb-2  text-gray-500">
                  <strong>Date:</strong> {selectedOrder.order_date}
                </p>

                <p className="mb-2  text-gray-500">
                  <strong>Total:</strong> {selectedOrder.price}
                </p>
                <p className="mb-2  text-gray-500">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      selectedOrder.order_status === "Delivered"
                        ? "bg-green-500"
                        : selectedOrder.order_status === "Shipped"
                        ? "bg-blue-500"
                        : selectedOrder.order_status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {selectedOrder.order_status}
                  </span>
                </p>
                {/* <p className="mb-2">
                  <strong>Items:</strong>{" "}
                  {(selectedOrder.items || []).join(", ")}
                </p> */}
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
      )}
    </>
  );
};

export default Orders;
