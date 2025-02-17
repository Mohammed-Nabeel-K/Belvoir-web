

"use client"

import React, { useState, useEffect } from "react";
import Container from "../../components/clothes/Container";
import Image from "next/image";
import Footer from "../../components/ui/footer/Footer";
import Navbar from "../../components/ui/navbar/Navbar";
import LoadingUi from "../../../../loading"

function Page() {
  const caption = "Elevate Your Style with Every Piece.";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  if (loading) {
    return <LoadingUi/>; 
  }

  return (
    <main className="min-h-screen bg-white">
      <div>
        <Navbar />
      </div>

      <div className="w-full h-[80vh] relative mt-3">
        <Image
          src="/clothes/clothess.png"
          alt="cover image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-white">
          <div className="text-6xl font-serif uppercase font-bold text-gold mt-9">Belvoir</div>
          <p className="mt-4 text-xl font-sans italic">{caption}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <Container />
      </div>
      
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

export default Page;
