"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerData = [
  {
    id: 1,
    image: '/home/1.jpg',
    title: 'Tailoring',
    description: 'Our expert tailors craft custom-fit garments that match your unique style and needs. From alterations to bespoke tailoring, we ensure every stitch reflects perfection.',
  },
  {
    id: 2,
    image: '/home/2.jpg',
    title: 'Laundry',
    description: 'Experience high-quality laundry services with eco-friendly detergents and state-of-the-art equipment, ensuring your clothes look fresh and feel amazing.',
  },
  {
    id: 3,
    image: '/home/3.jpg',
    title: 'Rentals',
    description: 'Find your perfect outfit for any occasion with our extensive rental collection. From weddings to corporate events, we\'ve got you covered.',
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeSlide = (newIndex: number) => {
    setIsAnimating(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 500); // Match this with transition duration
  };

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % bannerData.length);
  };

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + bannerData.length) % bannerData.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); 
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 ">
      <div className="bg-orange-50 w-full max-w-7xl rounded-lg shadow-md overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center p-6 gap-8">
          <div className="w-full md:w-1/2 lg:w-2/5 order-1">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden">
              <img
                key={currentSlide} // Force re-render for animation
                src={bannerData[currentSlide].image}
                alt={bannerData[currentSlide].title}
                className={`rounded-lg object-cover w-full h-full shadow-sm 
                  ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                  transition-all duration-500 ease-in-out`}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-3/5 space-y-4 text-center md:text-left order-2">
            <h1 
              key={`title-${currentSlide}`} // Force re-render for animation
              className={`text-3xl md:text-4xl font-sans tracking-wide text-gray-900 font-semibold
                ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                transition-all duration-500 ease-in-out`}
            >
              {bannerData[currentSlide].title}
            </h1>
            <p 
              key={`desc-${currentSlide}`} // Force re-render for animation
              className={`text-gray-700 text-lg leading-relaxed max-w-xl
                ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                transition-all duration-500 delay-100 ease-in-out`}
            >
              {bannerData[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${currentSlide === index ? 'bg-gray-800 w-4' : 'bg-gray-400 hover:bg-gray-600'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;