import React from "react";
import Image from "next/image";



const WhyBelvoirSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Belvoir?
          </h2>
          <p className="text-lg text-gray-600">
            At <span className="font-semibold text-blue-600">Belvoir</span>, we
            are committed to providing unmatched service and convenience.
            Here&apos;s why our customers love us:
          </p>
        </div>

        {/* Reasons List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
            <Image
              src="/home/craft.png"
              alt="craft"
              width={800}
              height={800}
              className="w-[60px] h-[60px]"
              priority 
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Expert Craftsmanship
            </h3>
            <p className="text-gray-600">
              Our team consists of skilled tailors and technicians who ensure
              the highest level of quality in all our services, from tailored
              outfits to precise alterations and reliable rentals.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
            <Image
              src="/home/affordable.png"
              alt="aff"
              width={800}
              height={800}
              className="w-[60px] h-[60px]"
              priority 
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Affordable Pricing
            </h3>
            <p className="text-gray-600">
              At Belvoir, we offer competitive pricing for all our services
              without compromising on quality. Whether you&apos;re renting
              equipment or getting custom tailoring, you&apos;ll find our prices
              reasonable.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
            <Image
              src="/home/satisfaction.png"
              alt="satis"
              width={800}
              height={800}
              className="w-[60px] h-[60px]"
              priority 
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Customer-Centric Approach
            </h3>
            <p className="text-gray-600">
              We prioritize customer satisfaction, offering personalized
              services and flexible solutions that cater to your unique needs.
              From tailored garments to rental flexibility, we go above and
              beyond to serve you.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
            <Image
              src="/home/policy.png"
              alt="policy"
              width={800}
              height={800}
              className="w-[60px] h-[60px]"
              priority 
            />
            <p className="text-gray-600">
              At Belvoir, we are committed to eco-friendly practices. We use
              sustainable fabrics, and delivery methods to
              reduce our environmental impact.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center  flex flex-col items-center">   
            <Image
              src="/home/convenient.png"
              alt="con"
              width={800}
              height={800}
              className="w-[60px] h-[60px]"
              priority 
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Convenience
            </h3>
            <p className="text-gray-600">
              With our easy-to-use website and efficient delivery service, you
              can access all of our services at the click of a button, bringing
              convenience right to your doorstep.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-center  flex flex-col items-center">
            <Image
              src="/home/service.png"
              alt="ser"
              width={800}
              height={800}
              className="w-[60px] h-[60px]"
              priority 
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Variety of Services
            </h3>
            <p className="text-gray-600">
              Whether you need professional tailoring, or a
              wide range of rental options, Belvoir offers a variety of services
              to meet your every need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBelvoirSection;
