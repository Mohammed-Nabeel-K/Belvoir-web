"use client"
import React from "react";
import Container from "../../components/Rentals/Container";
import Footer from "../../components/ui/footer/Footer";
import Carousel from "../../components/Rentals/Carousel"
import Navbar from "../../components/ui/navbar/Navbar";
function Page() {

  return (
    <main className="min-h-screen bg-white">
      <div>
        <Navbar/>
      </div> 
      <div className="h-[90vh]">
        <Carousel></Carousel>
      </div>
      <div className="mt-4 px-5">
        <Container />
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
}

export default Page;
