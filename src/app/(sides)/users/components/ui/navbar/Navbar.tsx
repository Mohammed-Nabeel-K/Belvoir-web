"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left section with logo and menu button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 mr-2 text-gray-900 hover:text-gray-600 transition-colors duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link href="#">
                <div className="flex-shrink-0 flex gap-2">
                  <Image
                    src="/home/tie.png"
                    alt="logo"
                    width={800}
                    height={800}
                    className="w-8"
                    priority
                  />
                  <h1 className="text-2xl font-serif tracking-wide">
                    Belvoir.
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex space-x-8">
                <Link href="/">
                  <div className="px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                    Home
                  </div>
                </Link>

                <Link href="/users/clothes">
                  <div className="px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                    Tailoring
                  </div>
                </Link>
                <Link href="/users/rentals">

                  <div className="px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                    Rentals
                  </div>
                </Link>

                <Link href="/users/about">
                  <div className="px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                    About
                  </div>
                </Link>

                <Link href="/users/about/#contact">
                  <div className="px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                    Contact
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200">
                <Search size={18} />
              </button>
              <Link href={"/users/cart"}>
                <button className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200">
                  <ShoppingCart size={18} />
                </button>
              </Link>
              <Link href={"/users/profile"}>
                <button className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200">
                  <User size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white/40 backdrop-blur-md">
            <Link href="#">
              <div className="block px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                Home
              </div>
            </Link>
            <Link href="#">
              <div className="block px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                Services
              </div>
            </Link>
            <Link href="#">
              <div className="block px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                About
              </div>
            </Link>
            <Link href="#">
              <div className="block px-3 py-2 text-gray-900 hover:text-gray-600 text-sm font-medium transition-colors duration-200">
                Contact
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
