// src/modules/Homepages/Layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation here
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/Bm Academy logo .png";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ now works

  // Don’t show navbar on dashboard
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }
  console.log("Current path:", location.pathname);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-20 transition-all duration-300 flex items-center justify-between px-4 md:px-6 h-20
          ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={logo}
              alt="BM Academy"
              className="max-h-24 md:max-h-28 w-auto object-contain"
            />
          </Link>
          <span
            className={`font-bold text-lg transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            ABM PORTAL
          </span>
        </div>

        {/* Center Nav Links (Desktop Only) */}
        <div
          className={`hidden md:flex gap-8 font-medium transition-colors duration-300 ${
            scrolled ? "text-green-800" : "text-green"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>

          <button
            onClick={() => setIsRegisterOpen(true)}
            className="text-green-600 font-medium hover:underline"
          >
            Register
          </button>
        </div>

        {/* Right Section (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            type="primary"
            onClick={() => setIsLoginOpen(true)}
            className="hover:text-green-600 cursor-pointer"
          >
            Login
          </Button>

          <Button
            type="primary"
            onClick={() => setIsRegisterOpen(true)}
            className="!bg-green-600 hover:!bg-green-700 !border-none px-6"
          >
            Register
          </Button>

          <Button
            type="primary"
            onClick={() => (window.location.href = "/recruiter-home")}
            className="!bg-green-600 hover:!bg-green-700 !border-none px-6"
          >
            Recruiter
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setDrawerVisible(true)}
            className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Menu</span>
            <FaTimes
              className="cursor-pointer text-lg"
              onClick={() => setDrawerVisible(false)}
            />
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="!bg-green-700 hover:!bg-green-800 !border-none w-full">
          <Link to="/" onClick={() => setDrawerVisible(false)}>
            Home
          </Link>
          <Link to="/jobs" onClick={() => setDrawerVisible(false)}>
            Jobs
          </Link>
          <Link to="/companies" onClick={() => setDrawerVisible(false)}>
            Companies
          </Link>
          <Link to="/services" onClick={() => setDrawerVisible(false)}>
            Services
          </Link>

          <Button
            type="primary"
            onClick={() => {
              setIsLoginOpen(true);
              setDrawerVisible(false);
            }}
            className="!text-gray-700 hover:!text-green-700 font-medium text-left w-full"
          >
            Login
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setIsRegisterOpen(true);
              setDrawerVisible(false);
            }}
            className="!bg-green-700 hover:!bg-green-800 !border-none w-full"
          >
            Register
          </Button>

          <div className="mt-4">
            <Link
              to="/recruiter-home"
              className="font-semibold text-gray-700 hover:text-green-700 mt-4 block"
              onClick={() => setDrawerVisible(false)}
            >
              Recruiter
            </Link>
          </div>
        </div>
      </Drawer>

      {/* Modals */}
      <LoginModal
        visible={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          navigate("/dashboard"); // redirect after login
        }}
      />

      <RegisterModal
        visible={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
