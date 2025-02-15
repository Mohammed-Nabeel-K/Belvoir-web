"use client"
import { useState } from "react";
import { FaBars, FaUser, FaAddressBook, FaShoppingBag } from "react-icons/fa";
import Profile from "../../components/ui/profile/Profile"
import ManageAddress from "../../components/ui/Address/Address"
import Orders from "../../components/ui/userorder/UserOrder"

import Navbar from "../../components/ui/navbar/Navbar";

const Sidebar = ({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className={`bg-gray-900 text-white ${isOpen ? "w-50" : "w-16"} h-screen p-4 transition-all fixed lg:fixed`}>
      <button className="mb-4 text-white lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <ul>
        <li
          className={`p-3 flex items-center gap-2 cursor-pointer ${activePage === "profile" ? "bg-gray-700" : ""}`}
          onClick={() => setActivePage("profile")}
        >
          <FaUser /> {isOpen && "Profile"}
        </li>
        <li
          className={`p-3 flex items-center gap-2 cursor-pointer ${activePage === "address" ? "bg-gray-700" : ""}`}
          onClick={() => setActivePage("address")}
        >
          <FaAddressBook /> {isOpen && "Manage Address"}
        </li>
        <li
          className={`p-3 flex items-center gap-2 cursor-pointer ${activePage === "orders" ? "bg-gray-700" : ""}`}
          onClick={() => setActivePage("orders")}
        >
          <FaShoppingBag /> {isOpen && "Orders"}
        </li>
      </ul>
    </div>
  );
};


const Settings = () => {
  const [activePage, setActivePage] = useState("profile");
  
  return (
    <>
    <Navbar></Navbar>
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="ml-[64px] lg:ml-[190px]  w-full  flex items-start justify-center h-[90vh]">{/* Adjust margin for sidebar width */}
        {activePage === "profile" && <Profile />}
        {activePage === "address" && <ManageAddress />}
        {activePage === "orders" && <Orders />}
      </div>
    </div>
    </>
  );
};

export default Settings;
