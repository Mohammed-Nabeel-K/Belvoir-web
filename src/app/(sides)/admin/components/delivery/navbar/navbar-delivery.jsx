"use client";

import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import NotificationDropdown from "../tailor-notification/notificationDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-10 top-0 right-0 w-full h-12 
      flex items-center justify-end gap-4 px-4 
      bg-white/70 backdrop-blur-md border-b border-white/20
      shadow-md">
      
      
      <span className="text-gray-800 font-Cormorant text-lg">name</span>
      
      
      <Link 
        href="/admin/delivery/profile"
        className="flex items-center justify-center h-8 w-8 
          rounded-full border border-gray-200/80 
          hover:bg-white/50 hover:border-gray-300 
          transition-all backdrop-blur-sm"
      >
        <User size={20} className="text-gray-600" />
      </Link>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 hover:bg-white/50 rounded-full 
          transition-all backdrop-blur-sm"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-gray-600" />
        <span className="absolute h-2 w-2 rounded-full bg-green-500 
          -top-0.5 right-0.5 shadow-sm" />
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12">
          {/* <NotificationDropdown /> */}
        </div>
      )}
    </nav>
  );
}