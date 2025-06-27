import React, { useState } from "react";
import { Link } from "react-router-dom";

const BG_DARK = "bg-[#1F2937]";
const ACCENT = "text-[#06B6D4]";
const ACCENT_BG = "bg-[#06B6D4]";

export default function ResolveNow() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className={`${BG_DARK}`}>
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold tracking-wide">ResolveNow</div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <button className="border border-white text-white px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:border-[#06B6D4] transition">
                Home
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-white text-[#06B6D4] px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] shadow transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="border border-white text-white px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:border-[#06B6D4] transition">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#1F2937] px-4 py-4 border-t border-[#06B6D4] space-y-2">
            <Link
              to="/"
              className="block text-white py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="block text-white py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block text-white py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
