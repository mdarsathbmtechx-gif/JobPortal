import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/assets/Bm Academy logo .png";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith("/dashboard")) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-30 transition-all duration-300 flex items-center justify-between px-4 md:px-6 h-20 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="BM Academy"
              className="max-h-16 md:max-h-20 w-auto object-contain"
            />
            <span
              className={`font-bold text-lg transition-colors duration-300 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              ABM PORTAL
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 font-medium">
          <Link
            to="/"
            className={`transition-colors duration-300 ${
              scrolled ? "text-green-800" : "text-green"
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`transition-colors duration-300 ${
              scrolled ? "text-green-800" : "text-green"
            }`}
          >
            Jobs
          </Link>
          <Link
            to="/companies"
            className={`transition-colors duration-300 ${
              scrolled ? "text-green-800" : "text-green"
            }`}
          >
            Companies
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button type="primary" onClick={() => setIsLoginOpen(true)}>
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

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center z-40">
          <button
            aria-label="Open menu"
            onClick={() => setDrawerVisible(true)}
            className="text-2xl text-black font-bold"
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
        <div className="flex flex-col gap-4 w-full">
          <Link to="/" onClick={() => setDrawerVisible(false)}>
            Home
          </Link>
          <Link to="/jobs" onClick={() => setDrawerVisible(false)}>
            Jobs
          </Link>
          <Link to="/companies" onClick={() => setDrawerVisible(false)}>
            Companies
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

          <Link
            to="/recruiter-home"
            className="font-semibold text-gray-700 hover:text-green-700 mt-4 block"
            onClick={() => setDrawerVisible(false)}
          >
            Recruiter
          </Link>
        </div>
      </Drawer>

      {/* Modals */}
      <LoginModal
        visible={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          navigate("/dashboard");
        }}
      />

      <RegisterModal
        visible={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        openLoginModal={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
