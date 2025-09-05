// src/modules/Dashboard/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaBookmark,
  FaSignOutAlt,
  FaBriefcase,
} from "react-icons/fa";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login-dashboard");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-dashboard");
  };

  const user = JSON.parse(localStorage.getItem("user")) || {
    email: "guest@email.com",
    name: "Guest User",
  };

  const avatarLetter = user?.name ? user.name[0].toUpperCase() : "G";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar (only inside dashboard) */}
      <header className="bg-white shadow-sm flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-bold text-green-600">Job Portal</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex max-w-7xl mx-auto mt-6 gap-6 px-4">
        {/* LEFT SIDEBAR (Profile Card) */}
        <aside className="hidden md:block w-72 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold">
              {avatarLetter}
            </div>
            <h2 className="mt-3 font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <button className="mt-3 text-green-600 text-sm hover:underline">
              View Full Profile
            </button>
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Applications</span>
              <span className="font-semibold text-green-600">12</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Saved Jobs</span>
              <span className="font-semibold text-green-600">5</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Connections</span>
              <span className="font-semibold text-green-600">34</span>
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* Tabs like LinkedIn nav */}
          <div className="bg-white rounded-lg shadow p-4 mb-4 flex gap-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded ${
                activeTab === "applications"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaClipboardList className="inline mr-2" /> Applications
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-2 rounded ${
                activeTab === "saved"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaBookmark className="inline mr-2" /> Saved Jobs
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded ${
                activeTab === "profile"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaUser className="inline mr-2" /> Profile
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">My Applications</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Frontend Developer</h3>
                    <p className="text-sm text-gray-500">Amazon - Chennai</p>
                  </div>
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
                    In Review
                  </span>
                </div>
                <div className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Data Analyst</h3>
                    <p className="text-sm text-gray-500">
                      Microsoft - Hyderabad
                    </p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded">
                    Accepted
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Saved Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Software Engineer</h3>
                  <p className="text-sm text-gray-500">Google - Bangalore</p>
                  <button className="mt-2 text-green-600 text-sm hover:underline">
                    View Job
                  </button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">UI/UX Designer</h3>
                  <p className="text-sm text-gray-500">Adobe - Remote</p>
                  <button className="mt-2 text-green-600 text-sm hover:underline">
                    View Job
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Profile Overview</h2>
              <p className="text-gray-600 mb-4">
                Keep your profile updated to improve your job matches.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Personal Info</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Name: {user?.name || "Not provided"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Email: {user?.email || "Not provided"}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Career Interests</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Update your job preferences and skills.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR (Optional) */}
        <aside className="hidden lg:block w-72 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-700 mb-3">
              Suggested Jobs
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">
                Backend Engineer @ Infosys
              </li>
              <li className="hover:underline cursor-pointer">
                Cloud Architect @ TCS
              </li>
              <li className="hover:underline cursor-pointer">
                Data Scientist @ Wipro
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
