"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/ui/navbar/Navbar";

const About = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API)
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white text-[#0F172A] py-12 px-6 md:px-16 lg:px-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">About Belvoir</h1>
          <p className="text-lg mt-4">
            Elevate Your Style with Custom Tailoring & Premium Rentals
          </p>
        </div>

        {/* About Belvoir */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold">Crafted to Fit, Designed for You</h2>
            <p className="mt-4">
              At <span className="font-semibold">Belvoir</span>, we believe that every individual deserves a perfect fit. Our
              custom tailoring service lets you enter and add your measurements effortlessly, ensuring an impeccable fit for
              every occasion. Whether it’s a bespoke suit, a stylish dress, or a classic ensemble, we craft attire that reflects
              your personality.
            </p>
          </div>
          <motion.img
            src="/Rentals/freepik__upload__70594.png"
            alt="Custom Tailoring"
            className="w-full rounded-lg shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Rental Services */}
        <div className="grid md:grid-cols-2 gap-8 items-center mt-16">
          <motion.img
            src="/Rentals/stylish-bearded-shop-assistant-dressed-blue-elegant-suit-working-menswear-store.jpg"
            alt="Rental Services"
            className="w-full rounded-lg shadow-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <div>
            <h2 className="text-2xl font-semibold">Premium Rental Service</h2>
            <p className="mt-4">
              Need a stunning outfit for a special event without the long-term commitment? Our rental service offers an
              exquisite collection of high-end fashion pieces. From elegant suits to glamorous dresses, rent your dream outfit
              hassle-free.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold">Experience Tailoring Like Never Before</h2>
          <p className="mt-4">
            Join the Belvoir experience today and step into a world of elegance, precision, and convenience.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center">Contact Us</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mt-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full border border-[#0F172A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full border border-[#0F172A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-3 w-full border border-[#0F172A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Message/Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 p-3 w-full border border-[#0F172A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0F172A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
