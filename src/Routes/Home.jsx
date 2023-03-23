import { useState } from "react";
import BottomBar from "../components/BottomBar/BottomBar";
import Navbar from "../components/Navbar/Navbar";
import ProductsByCats from "../components/ProductByCategory/ProductsByCats";
import LandingSection from "../Sections/LandingSection";

const Home = () => {
  
  return (
    <main className="main">
      <Navbar />
      <LandingSection />
      <ProductsByCats />
      <BottomBar />

      
    </main>
  );
};

export default Home;
