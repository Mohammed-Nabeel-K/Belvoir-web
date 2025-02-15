"use client";

import {
  BadgeIndianRupee,
  BoxIcon,
  ChevronsDown,
  ChevronsUp,
  FilterIcon,
  PackageOpenIcon,
  Star,
} from "lucide-react";
import { useState } from "react";
import Metricscard from "../../../components/ui/tailor-merics-card/metricscard";
import NotificationDropdown from "../../../components/ui/tailor-notification/notificationDropdown";
import Ordertable from "../../../components/ui/tailor-order-table/ordertable";



export default function Page() {
  const [drop, setDrop] = useState(false);
  return (
    <div className="p-4 bg-white min-h-screen flex flex-col gap-4">
      <h1 className="text-2xl xl:text-4xl text-black text-start font-Libre">
        Welcome Back!!
      </h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 font-Cormorant font-medium">
        <Metricscard
          title="Totel Revenue"
          value="10,250"
          subtitile="This Month"
          icon="₹"
          color="green"
          iconforcard={<BadgeIndianRupee size={150} />}
        />
        <Metricscard
          title="Pending Order"
          value="250"
          subtitile="Active Orders"
          icon="📦"
          color="blue"
          iconforcard={<BoxIcon size={150} />}
        />
        <Metricscard
          title="Completed Orders"
          value="250"
          subtitile="This Year"
          icon="📦"
          color="red"
          iconforcard={<PackageOpenIcon size={150} />}
        />
        <Metricscard
          title="Rating"
          value="4.5"
          subtitile="Customer Rating"
          icon="⭐"
          color="yellow"
          iconforcard={<Star size={150} />}
        />
      </div>
      <div className="flex justify-between font-Libre ">
        <p className="text-black  text-2xl">Orders</p>
        <div
          onClick={() => {
            setDrop(!drop);
          }}
          className="relative cursor-pointer min-w-60 flex items-center justify-between  py-1 px-2 bg-blue-100 text-blue-600 rounded-md"
        >
          <div className="flex gap-1 items-center">
            <FilterIcon size={16} />
            <p>Filter</p>
          </div>
          {drop ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
          <div
            className={`transition-all duration-300 ease-out absolute grid grid-cols-1 gap-1 min-w-[240px] top-8 left-0 bg-white p-2 rounded-lg shadow-lg ${
              drop
                ? "h-auto opacity-100 py-2"
                : "h-0 opacity-0 py-0 pointer-events-none"
            }`}
          >
            <button
              onClick={() => {
                setDrop(false);
              }}
              className="w-full text-center text-sm text-dark bg-blue-100 rounded-lg p-1"
            >
              All
            </button>
            <button
              onClick={() => {
                setDrop(false);
              }}
              className="w-full text-center text-sm text-dark bg-blue-100 rounded-lg p-1"
            >
              Pending
            </button>
            <button
              onClick={() => {
                setDrop(false);
                
              }}
              className="w-full text-center text-sm text-dark bg-blue-100 rounded-lg p-1"
            >
              Delivered
            </button>
            <button
              onClick={() => {
                setDrop(false);
              }}
              className="w-full text-center text-sm text-dark bg-blue-100 rounded-lg p-1"
            >
              Shipped
            </button>
            <button
              onClick={() => {
                setDrop(false);
              }}
              className="w-full text-center text-sm text-dark bg-blue-100 rounded-lg p-1"
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
      <div>
        <Ordertable height="overflow-x-auto" />
      </div>
      <div className="flex gap-4 ">
        <div className="flex-1 p-2 bg-light rounded-md ">
          <h2 className="text-2xl font-bold text-center text-dark font-Cormorant">
            Revenue Chart
          </h2>
        </div>
        <div>
          <NotificationDropdown />
        </div>
      </div>
    </div>
  ); 
}
