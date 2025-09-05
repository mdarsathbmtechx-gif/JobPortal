// src/modules/Recruiter/Dashboard/RecruiterDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBriefcase,
  FaClipboardList,
  FaUsers,
  FaUserCircle,
  FaPlus,
} from "react-icons/fa";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");

  useEffect(() => {
    const recruiter = localStorage.getItem("recruiter");
    if (!recruiter) navigate("/recruiter-home"); // redirect if not logged in
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("recruiter");
    navigate("/recruiter-home");
  };

  const recruiter = JSON.parse(localStorage.getItem("recruiter")) || {
    name: "Recruiter",
    email: "recruiter@email.com",
    company: "Company Name",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-bold text-green-600">Recruiter Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Layout */}
      <div className="flex max-w-7xl mx-auto mt-6 gap-6 px-4">
        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block w-72 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center text-center">
            <FaUserCircle className="text-6xl text-green-600" />
            <h2 className="mt-3 font-semibold text-gray-800">{recruiter.name}</h2>
            <p className="text-sm text-gray-500">{recruiter.email}</p>
            <p className="text-sm text-gray-400">{recruiter.company}</p>
          </div>

          <hr className="my-4" />

          <nav className="space-y-2 text-sm">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "jobs"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaBriefcase className="inline mr-2" /> My Jobs
            </button>
            <button
              onClick={() => setActiveTab("post")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "post"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaPlus className="inline mr-2" /> Post a Job
            </button>
            <button
              onClick={() => setActiveTab("applicants")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "applicants"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaUsers className="inline mr-2" /> Applicants
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === "reports"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaClipboardList className="inline mr-2" /> Reports
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {activeTab === "jobs" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">My Posted Jobs</h2>
              <ul className="space-y-3">
                <li className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold">Software Engineer</h3>
                  <p className="text-sm text-gray-500">10 Applicants</p>
                </li>
                <li className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold">UI/UX Designer</h3>
                  <p className="text-sm text-gray-500">6 Applicants</p>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "post" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Post a New Job</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full border rounded p-2"
                />
                <textarea
                  placeholder="Job Description"
                  className="w-full border rounded p-2"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Post Job
                </button>
              </form>
            </div>
          )}

          {activeTab === "applicants" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Applicants</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg flex justify-between">
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-gray-500">Frontend Developer</p>
                  </div>
                  <button className="text-green-600 hover:underline">
                    View Resume
                  </button>
                </div>
                <div className="p-4 border rounded-lg flex justify-between">
                  <div>
                    <h3 className="font-semibold">Jane Smith</h3>
                    <p className="text-sm text-gray-500">UI Designer</p>
                  </div>
                  <button className="text-green-600 hover:underline">
                    View Resume
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Reports & Analytics</h2>
              <p className="text-gray-600">
                Coming soon: Job performance, applicant analytics, etc.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
