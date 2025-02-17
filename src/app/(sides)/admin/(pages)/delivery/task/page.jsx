"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../../axios/axiosinstance/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Loading from "../../../../users/components/ui/Loader";
const Page = () => {
  const [Assigned, setAssigned] = useState([]);
  const [Picked, setPicked] = useState([]);
  const [Delivered, setDelivered] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [loading, setloading] = useState(false);

  const handleEdit = async () => {
    if (!selectedTaskId || !updatedStatus) return;

    try {
      const response = await axiosInstance.patch(
        `/Delivery/change/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userData")}`,
          },
          params: {
            id: selectedTaskId,
            status: updatedStatus,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Item updated successfully");
        setIsModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.log("Error updating status in task", error);
    }
  };
  const fetchData = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get(`/Delivery/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userData")}`,
        },
      });

      const assigned = response.data.data.deliveryOrders.filter(
        (x) => x.order_status === "Assigned"
      );
      const picked = response.data.data.deliveryOrders.filter(
        (x) => x.order_status === "Picked"
      );
      const delivered = response.data.data.deliveryOrders.filter(
        (x) => x.order_status === "Delivered"
      );

      setAssigned(assigned);
      setPicked(picked);
      setDelivered(delivered);
    } catch (error) {
      console.log("Error in fetching the task inner page data", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openEditModal = (taskId, status) => {
    setSelectedTaskId(taskId);
    setEditingStatus(status);
    setUpdatedStatus(status);
    setIsModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="p-10">
          <h1 className="pb-10 text-3xl text-slate-400">Tasks</h1>
          <div className="flex w-full h-screen gap-4">
            {/* Assigned Section */}
            <div className="w-1/3 text-center flex flex-col items-center gap-4">
              <div className="w-[90%] bg-[#0E0E25] rounded py-1 text-white">
                Assigned
              </div>
              {Assigned?.map((order, i) => (
                <div
                  key={i}
                  className="w-[90%] p-4 shadow-md border rounded-md flex justify-between items-center"
                >
                  <div className="pl-5 text-[10px]">
                    <p>#{order.order_id}</p>
                    <p className="text-gray-600">
                      Cust Name: {order.customerName}
                    </p>
                    <p className="text-gray-600">
                      Date: {new Date(order.order_date).toLocaleString()}
                    </p>
                    <p className="text-red-600">
                      DeadLine: {new Date(order.deadline).toLocaleString()}
                    </p>
                  </div>
                  <div className="pr-5">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="size-3 cursor-pointer"
                      onClick={() => openEditModal(order.order_id, "Assigned")}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Picked Section */}
            <div className="w-1/3 text-center flex flex-col items-center gap-4">
              <div className="w-[90%] bg-[#0E0E25] rounded py-1 text-white">
                Picked
              </div>
              {Picked?.map((order, i) => (
                <div
                  key={i}
                  className="w-[90%] p-4 shadow-md border rounded-md flex justify-between items-center"
                >
                  <div className="pl-5 text-[10px]">
                    <p>#{order.order_id}</p>
                    <p className="text-gray-600">
                      Cust Name: {order.customerName}
                    </p>
                    <p className="text-gray-600">
                      Date: {new Date(order.order_date).toLocaleString()}
                    </p>
                    <p className="text-red-600">
                      DeadLine: {new Date(order.deadline).toLocaleString()}
                    </p>
                  </div>
                  <div className="pr-5">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="size-3 cursor-pointer"
                      onClick={() => openEditModal(order.order_id, "Picked")}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Delivered Section */}
            <div className="w-1/3 text-center flex flex-col items-center gap-4">
              <div className="w-[90%] bg-[#0E0E25] rounded py-1 text-white">
                Delivered
              </div>
              {Delivered?.map((order, i) => (
                <div
                  key={i}
                  className="w-[90%] p-4 shadow-md border rounded-md flex justify-between items-center"
                >
                  <div className="pl-5 text-[10px]">
                    <p>#{order.order_id}</p>
                    <p className="text-gray-600">
                      Cust Name: {order.customerName}
                    </p>
                    <p className="text-gray-600">
                      Date: {new Date(order.order_date).toLocaleString()}
                    </p>
                   
                  </div>
                  <div className="pr-5">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="size-3 cursor-pointer"
                      onClick={() => openEditModal(order.order_id, "Delivered")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 pb-8 rounded-md shadow-lg w-96 text-center">
                <h2 className="text-xl font-semibold mb-4">
                  Update Your Status
                </h2>
                <select
                  className="border-none outline-none w-full p-2"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option
                    value="Assigned"
                    disabled={editingStatus === "Delivered" || "Picked"} 
                  >
                    Assigned
                  </option>
                  <option
                    value="Picked"
                    disabled={editingStatus === "Delivered"}
                  >
                    Picked
                  </option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-[#0E0E25] text-white rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
