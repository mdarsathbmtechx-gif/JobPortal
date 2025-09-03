// src/modules/Homepages/Layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Button, Dropdown, Drawer } from "antd";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/Bm Academy logo .png";
import LoginModal from "../../Auth/LoginModal"; // correct relative path
import RegisterModal from "../../Auth/RegisterModal"; // correct relative path

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const employerItems = [
    {
      key: "1",
      label: <Link to="/recruiter-home">Recruiter</Link>,
    },
  ];

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
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </button>
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

          <Dropdown menu={{ items: employerItems }} placement="bottomRight">
            <Button
              type="text"
              className={`transition-colors duration-300 ${
                scrolled
                  ? "!text-gray-800 hover:!text-green-600"
                  : "!text-white hover:!text-green-400"
              }`}
            >
              For Employers
            </Button>
          </Dropdown>
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
        <div className="flex flex-col gap-6 mt-4">
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
            <p className="font-semibold text-gray-700 mb-2">For Employers</p>
            <Link
              to="/recruiter"
              className="block text-gray-600 hover:text-green-700"
              onClick={() => setDrawerVisible(false)}
            >
              Recruiter Login
            </Link>
          </div>
        </div>
      </Drawer>

      {/* Modals */}
      <LoginModal visible={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal visible={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
}
