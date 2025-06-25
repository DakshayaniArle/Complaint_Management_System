import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BG_DARK = "bg-[#1F2937]";
const ACCENT = "text-[#06B6D4]";
const USERNAME = "John Doe";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  // Helper to check active link (matches subroutes too)
  const isActive = (path) => {
    // exact for home, startsWith for others
    if (path === "/user") return location.pathname === "/user";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`${BG_DARK}`}>
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side: Username and all navigation links */}
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold tracking-wide">{USERNAME}</span>
            <Link
              to="/user"
              className={`font-medium transition ${
                isActive("/user") ? "text-[#06B6D4]" : "hover:text-[#06B6D4]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/user/submit"
              className={`font-medium transition ${
                isActive("/user/submit") ? "text-[#06B6D4]" : "hover:text-[#06B6D4]"
              }`}
            >
              Submit Complaint
            </Link>
            <Link
              to="/user/complaints"
              className={`font-medium transition ${
                isActive("/user/complaints") ? "text-[#06B6D4]" : "hover:text-[#06B6D4]"
              }`}
            >
              My Complaints
            </Link>
            <Link
              to="/user/status"
              className={`font-medium transition ${
                isActive("/user/status") ? "text-[#06B6D4]" : "hover:text-[#06B6D4]"
              }`}
            >
              Status
            </Link>
            <Link
              to="/user/about"
              className={`font-medium transition ${
                isActive("/user/about") ? "text-[#06B6D4]" : "hover:text-[#06B6D4]"
              }`}
            >
              About
            </Link>
          </div>
         
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className={`bg-white ${ACCENT} px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] shadow transition`}
            >
              Logout
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white focus:outline-none ml-2"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#1F2937] px-4 py-2 border-t border-[#06B6D4]">
            <span className="block py-2 text-white font-bold">{USERNAME}</span>
            <Link to="/user" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
            <Link to="/user/submit" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              Submit Complaint
            </Link>
            <Link to="/user/complaints" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              My Complaints
            </Link>
            <Link to="/user/status" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              Status
            </Link>
            <Link to="/user/about" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              About
            </Link>
            <button
              className="block py-2 text-white w-full text-left"
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}