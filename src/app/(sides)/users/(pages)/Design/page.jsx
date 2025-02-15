"use client";

import React, { useState } from "react";

import Footer from "../../components/ui/footer/Footer";

import Navbar from "../../components/ui/navbar/Navbar";
import DesignContainer from "../../components/Design/DesignContainer";

function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <DesignContainer />

      <Footer />
    </main>
  );
}

export default Page;
