import React from "react";
import Hero from "../components/Hero";
import Latest from "../components/Latest";
import BestSeller from "../components/BestSeller";
import Policy from "../components/Policy";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Latest />
      <BestSeller />
      <Policy />
      <Newsletter />
    </div>
  );
};

export default Home;
