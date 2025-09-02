// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Layout from "./modules/Homepages/Layout/Layout";
import Hero from "./modules/Homepages/Pages/Hero";
import JobGrid from "./modules/Homepages/Pages/JobGrid";
import Testimonials from "./modules/Homepages/Pages/Testimonials";
import Register from "./modules/Auth/Register"; 
import Login from "./modules/Auth/Login";
import Jobs from "./modules/Homepages/Pages/Jobs";
import { Scrolltotop } from "./Scrolltotop";

function App() {
  return (
    <>
      <Scrolltotop />
      <Routes>
        {/* All pages wrapped in Layout */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <JobGrid />
                <Testimonials />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
