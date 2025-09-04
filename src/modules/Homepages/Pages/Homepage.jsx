// src/modules/Homepages/Pages/Homepage.jsx
import React from "react";
import Hero from "./Hero";
import CategorySection from "./Category";
import JobGrid from "./JobGrid";
import Testimonials from "./Testimonials";
import CompanyGrid from "./CompanyGrid";

export default function Homepage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <JobGrid />
      <CompanyGrid/>
      <Testimonials />
    </>
  );
}
