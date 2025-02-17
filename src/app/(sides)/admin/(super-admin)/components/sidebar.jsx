"use client";

import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdDashboard, MdPerson, MdDesignServices, MdOutlineLocalLaundryService } from "react-icons/md";

import { FaUsers, FaTruck, FaClipboardList, FaShoppingCart, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex   font-sans bg-[#F5F6FA] text-gray-800">
      
      <div
        className={`fixed top-0 left-0 h-full w-64 p-6 bg-[#0E0E25] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:relative shadow-lg`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-white">Belvoir.</h1>
          <button className="text-white md:hidden" onClick={toggleSidebar}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <ul className="space-y-6 text-base">
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <MdDashboard size={20} />
            <Link href="/admin/dashboard" className="flex-1">
              Dashboard
            </Link>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaClipboardList size={20} />
            <Link href="/admin/sales-report" className="flex-1">
              Sales report
            </Link>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaUsers size={20} />
            <Link href="/admin/users-list" className="flex-1">
              Users List
            </Link>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <MdPerson size={20} />
            <Link href="/admin/tailor-list" className="flex-1">
              Tailor List
            </Link>
          </li>
          {/* <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <MdOutlineLocalLaundryService size={20} />
            <Link href="/admin/laundry-list" className="flex-1">
              Laundry List
            </Link>
          </li> */}
            <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaClipboardList size={20} />
            <Link href="/admin/order-list" className="flex-1">
              Orders
            </Link>
          </li>

          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaTruck size={20} />
            <Link href="/admin/deliveryboy-list" className="flex-1">
              Delivery Boy List
            </Link>
          </li>
          
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaShoppingCart size={20} />
            <Link href="/admin/cloth-list" className="flex-1">
              Cloth List
            </Link>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <MdDesignServices size={20} />
            <Link href="/admin/design-list" className="flex-1">
              Design List
            </Link>
          </li>
          <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaClipboardList size={20} />
            <Link href="/admin/rental-products" className="flex-1">
              Rental Products
            </Link>
          </li>
        
          
          {/* <li className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-lg transition-all">
            <FaEnvelope size={20} />
            <Link href="/admin/messages" className="flex-1">
              Feedback
            </Link>
          </li> */}
          
        </ul>
      </div>

      
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
