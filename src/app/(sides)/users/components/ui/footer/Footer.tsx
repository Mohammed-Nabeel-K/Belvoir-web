import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* About Us Section */}
        <div className="space-y-4 flex flex-col items-center ">
          <h3 className="text-lg font-serif mb-6 w-max">About Us</h3>
          <p className="text-sm text-gray-300 leading-relaxed w-max">
            Your trusted destination<br />
            for tailored perfection and<br />
            premium branded clothing.<br />
            Crafted with care,<br />
            delivered with love.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4 flex flex-col items-center">
          <h3 className="text-lg font-serif mb-6 w-max">Quick Links</h3>
          <div className="flex flex-col space-y-3 w-max">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Shop</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Tailoring Services</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="space-y-4 flex flex-col items-center">
          <h3 className="text-lg font-serif mb-6 w-max">Contact Us</h3>
          <div className="space-y-3 text-sm text-gray-300 w-max">
            <p className='w-max'>Email: Essence2024@gmail.com</p>
            <p>Phone: +91 7356489308</p>
            <p>Address: 123 Fashion Street,<br />Style City, India</p>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="space-y-4 flex flex-col items-center">
          <h3 className="text-lg font-serif mb-6 w-max">Follow Us</h3>
          <div className="flex flex-col space-y-3 w-max">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">©2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;