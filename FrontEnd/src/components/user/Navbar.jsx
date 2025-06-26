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

  const isActive = (path) => {
    if (path === "/user") return location.pathname === "/user";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`${BG_DARK}`}>
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Brand & Desktop Menu */}
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold tracking-wide">{USERNAME}</span>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/user"
                className={`font-medium transition ${
                  isActive("/user") ? ACCENT : "hover:text-[#06B6D4]"
                }`}
              >
                Home
              </Link>
              <Link
                to="/user/submit"
                className={`font-medium transition ${
                  isActive("/user/submit") ? ACCENT : "hover:text-[#06B6D4]"
                }`}
              >
                Submit Complaint
              </Link>
              <Link
                to="/user/complaints"
                className={`font-medium transition ${
                  isActive("/user/complaints") ? ACCENT : "hover:text-[#06B6D4]"
                }`}
              >
                My Complaints
              </Link>
              <Link
                to="/user/status"
                className={`font-medium transition ${
                  isActive("/user/status") ? ACCENT : "hover:text-[#06B6D4]"
                }`}
              >
                Status
              </Link>
              <Link
                to="/user/about"
                className={`font-medium transition ${
                  isActive("/user/about") ? ACCENT : "hover:text-[#06B6D4]"
                }`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Logout & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className={`hidden md:block bg-white ${ACCENT} px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] shadow transition`}
            >
              Logout
            </button>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white text-2xl"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#1F2937] px-4 pb-4 pt-2 border-t border-[#06B6D4] space-y-2">
            <span className="block py-1 text-white font-bold">{USERNAME}</span>
            {[
              { label: "Home", to: "/user" },
              { label: "Submit Complaint", to: "/user/submit" },
              { label: "My Complaints", to: "/user/complaints" },
              { label: "Status", to: "/user/status" },
              { label: "About", to: "/user/about" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 text-white hover:text-[#06B6D4] transition"
              >
                {item.label}
              </Link>
            ))}
            <button
              className="block w-full text-left py-2 text-white hover:text-red-400"
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
