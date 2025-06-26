import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const BG_DARK = "bg-[#1F2937]";
const ACCENT = "text-[#06B6D4]";
const ACCENT_BG = "bg-[#06B6D4]";

export default function ResolveNow() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className={`${BG_DARK}`}>
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-wide">ResolveNow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <button
                className={`border border-white text-white px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white hover:border-[#06B6D4] transition`}
              >
                Home
              </button>
            </Link>
            <Link to="/login">
              <button
                className={`bg-white ${ACCENT} px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] shadow transition`}
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                className={`border border-white text-white px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white hover:border-[#06B6D4] transition`}
              >
                Register
              </button>
            </Link>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white focus:outline-none"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
        {showMobileMenu && (
          <div className="md:hidden bg-[#1F2937] px-4 py-2 border-t border-[#06B6D4]">
            <Link to="/" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
            <Link to="/login" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              Login
            </Link>
            <Link to="/signup" className="block py-2 text-white" onClick={() => setShowMobileMenu(false)}>
              Register
            </Link>
          </div>
        )}
      </nav>
      
    </div>
  );
}