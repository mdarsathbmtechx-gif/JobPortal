import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Layout from "./modules/Homepages/Layout/Layout";
import Homepage from "./modules/Homepages/Pages/Homepage";  
import Register from "./modules/Auth/Register"; 
import Login from "./modules/Auth/Login";
import Jobs from "./modules/Homepages/Pages/Jobs";
import { Scrolltotop } from "./Scrolltotop";  
import RecruiterHome from "./modules/Recruiter/RecruiterHome";
import RecruiterLayout from "./modules/Recruiter/RecruiterLayout/RecruiterLayout";  
// ---- Add missing imports ----
import PostJob from "./modules/Recruiter/Pages/PostJob";
import JobList from "./modules/Recruiter/Pages/JobList";
import Applicants from "./modules/Recruiter/Pages/Applicants";
import Profile from "./modules/Homepages/Pages/Profile";
import Companies from "./modules/Homepages/Pages/Companies";

function App() {
  return (
    <>
      <Scrolltotop />
      <Routes>
        {/* ---------- Normal Website Layout ---------- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/jobseekers" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/jobs" element={<Jobs />} /> 
          <Route path="/profile" element={<Profile/>}/>
        </Route>

        {/* ---------- Recruiter Layout ---------- */}
        <Route element={<RecruiterLayout />}>
          <Route path="/recruiter-home" element={<RecruiterHome />} />
          <Route path="/recruiter/post-job" element={<PostJob />} />
          <Route path="/recruiter/jobs" element={<JobList />} />
          <Route path="/recruiter/applicants" element={<Applicants />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
