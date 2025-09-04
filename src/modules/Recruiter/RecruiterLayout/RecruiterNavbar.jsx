import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import logo from "@/assets/Bm Academy logo .png";
import RecruiterLogin from "../RecruiterAuth/RecruiterLogin";

export default function RecruiterNavbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const menuItems = [
    { key: "1", label: <Link to="/recruiter-home">Home</Link> },
    { key: "2", label: <Link to="/recruiter-products">Products</Link> },
    { key: "3", label: <Link to="/recruiter-pricing">Pricing</Link> },
    { key: "4", label: <Link to="/recruiter-about">About</Link> },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Recruiter Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-black">Recruiter Portal</span>
          </div>
          

          {/* Center Menu */}
          <div className="hidden md:flex">
            <Menu
              mode="horizontal"
              items={menuItems}
              className="border-0 bg-transparent font-medium text-black"
              overflowedIndicator={null}
            />
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <Button
              type="primary"
              style={{ background: "#16a34a", borderColor: "#16a34a" }}
              className="px-5"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </Button>
                {/* Post Job Button */}
            <Link to="/recruiter/post-job">
              <Button
                type="primary"
                style={{ background: "#16a34a", borderColor: "#16a34a" }}
                className="px-5"
              >
                Post a Job
              </Button>
            </Link>
            

            <Link to="/jobseekers">
              <Button
                type="primary"
                style={{ background: "#2563eb", borderColor: "#2563eb" }}
                className="px-5"
              >
                For Jobseekers
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Recruiter Login Popup */}
      <RecruiterLogin open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
