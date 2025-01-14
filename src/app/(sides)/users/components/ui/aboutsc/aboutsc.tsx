import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img
            src="/home/tie.png" // Update with your logo's path
            alt="Company Logo"
            className="h-16 w-auto"
          />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-600">
            Welcome to <span className="font-semibold text-blue-600">Belvoir</span> — your one-stop solution for tailoring, laundry, and rental services! We specialize in providing high-quality, personalized services to meet your needs. Whether you&apos;re looking to have your clothes tailored to perfection, need laundry done with care, or require rentals for events or day-to-day use, we&apos;ve got you covered.
          </p>
        </div>

        {/* Company Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
            <img src="/home/clothing.png" alt="tailor" className="w-20" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tailoring</h3>
            <p className="text-gray-600">
              We offer expert tailoring services to ensure your clothes fit perfectly. From custom-made outfits to alterations, our experienced tailors are dedicated to providing top-quality craftsmanship.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
          <img src="/home/laundry-basket.png" alt="tailor" className="w-20" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Laundry</h3>
            <p className="text-gray-600">
              Our laundry services guarantee your garments are treated with the utmost care. We use eco-friendly detergents to clean and preserve the quality of your clothing while maintaining their freshness.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
          <img src="/home/clothes-hanger.png" alt="tailor" className="w-20"/>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Rentals</h3>
            <p className="text-gray-600">
              Need something for a special occasion or everyday use? We provide rentals for a wide variety of products, including clothing, accessories, and equipment. Affordable and convenient, we make sure you get what you need, when you need it.
            </p>
          </div>
        </div>

        {/* Company Vision */}
        <div className="mt-12 text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-lg text-gray-600">
            At <span className="font-semibold text-blue-600">Belvoir</span>, we aim to provide the highest level of service with a focus on sustainability, customer satisfaction, and convenience. We&apos;re here to make your life easier, one service at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
