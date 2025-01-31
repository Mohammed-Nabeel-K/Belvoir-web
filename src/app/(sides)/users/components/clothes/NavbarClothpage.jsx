"use client"

import React, { useState } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NavbarCloth = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
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

            <div className="flex items-center space-x-6">
              <button className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200">
                <ShoppingCart size={18} />
              </button>
              <button className="p-2 text-gray-900 hover:text-gray-600 transition-colors duration-200">
                <User size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default NavbarCloth;
