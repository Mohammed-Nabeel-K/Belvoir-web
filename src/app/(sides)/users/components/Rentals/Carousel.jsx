import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


import { Pagination,Autoplay } from 'swiper/modules';
import Image from 'next/image';
import im1 from "../../../../../../public/Rentals/freepik__upload__70594.png"
import im2 from "../../../../../../public/Rentals/stylish-bearded-shop-assistant-dressed-blue-elegant-suit-working-menswear-store.jpg"

export default function App() {
  return (
    <>  
      <Swiper
        style={{height:"85vh"}}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 3000, 
            disableOnInteraction: true, 
          }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        <div className='absolute top-[50%] left-[50%] z-10 translate-x-[-50%] traslate-y-[-50%] text-[30px] font-serif uppercase font-bold text-gold flex text-white '>Belvoir Rentals</div>
        <SwiperSlide>
        <div className="relative">
          <Image
            alt=""
            style={{ height: "85vh" }}
            className="object-cover w-full"
            src={im1}
          />
          {/* White Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        </div>
      </SwiperSlide>     
      <SwiperSlide>
      <div className="relative">
        <Image
          alt=""
          style={{ height: "85vh" }}
          className="object-cover w-full"
          src={im2}
        />
        {/* White Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    </SwiperSlide>     
     </Swiper>
    </>
  );
}
