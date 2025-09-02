// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import logo from "@/assets/Bm Academy logo .png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const employerItems = [
    { key: "1", label: "Recruiter Login" },
    
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed w-full z-20 transition-all duration-300 flex items-center justify-between px-4 md:px-6 h-20
          ${scrolled ? "bg-white shadow-md" : "bg-transparent"}
        `}
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
          <Link to="/login">Login</Link>
        </div>

        {/* Right Section (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button
              type="primary"
              className="hover:text-green-600 cursor-pointer"
            >
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button
              type="primary"
              className="!bg-green-600 hover:!bg-green-700 !border-none px-6"
            >
              Register
            </Button>
          </Link>

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
            onClick={() => setIsOpen(!isOpen)}
            className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
<div
  className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out md:hidden
  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
>
  <div className="p-6 flex flex-col gap-6">
    <Link
      to="/"
      className="font-medium text-gray-700 hover:text-green-700"
      onClick={() => setIsOpen(false)}
    >
      Home
    </Link>
    <Link
      to="/jobs"
      className="font-medium text-gray-700 hover:text-green-700"
      onClick={() => setIsOpen(false)}
    >
      Jobs
    </Link>
    <Link
      to="/companies"
      className="font-medium text-gray-700 hover:text-green-700"
      onClick={() => setIsOpen(false)}
    >
      Companies
    </Link>
    <Link
      to="/services"
      className="font-medium text-gray-700 hover:text-green-700"
      onClick={() => setIsOpen(false)}
    >
      Services
    </Link>

    <Link to="/login" onClick={() => setIsOpen(false)}>
      <Button
        type="primary"
        className="!text-gray-700 hover:!text-green-700 font-medium text-left w-full"
      >
        Login
      </Button>
    </Link>

    <Link to="/register" onClick={() => setIsOpen(false)}>
      <Button
        type="primary"
        className="!bg-green-700 hover:!bg-green-800 !border-none w-full"
      >
        Register
      </Button>
    </Link>

    <div className="mt-4">
      <p className="font-semibold text-gray-700 mb-2">For Employers</p>
      <Link
        to="/recruiter-login"
        className="block text-gray-600 hover:text-green-700"
        onClick={() => setIsOpen(false)}
      >
        Recruiter Login
      </Link>
    </div>
  </div>
</div>

    </>
  );
}
