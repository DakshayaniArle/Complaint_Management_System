import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] w-full border-t-2 border-[#06B6D4]">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-3">
        {/* Left: Logo and tagline */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="text-2xl font-bold text-white">ResolveNow</span>
          <span className="text-sm text-gray-400">Your voice, resolved.</span>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex flex-col items-center space-y-2 text-sm">
          <Link to="/user" className="text-gray-300 hover:text-[#06B6D4] transition">
            Home
          </Link>
          <Link to="/user/submit" className="text-gray-300 hover:text-[#06B6D4] transition">
            Submit Complaint
          </Link>
          <Link to="/user/complaints" className="text-gray-300 hover:text-[#06B6D4] transition">
            My Complaints
          </Link>
          <Link to="/user/status" className="text-gray-300 hover:text-[#06B6D4] transition">
            Status
          </Link>
          <Link to="/user/about" className="text-gray-300 hover:text-[#06B6D4] transition">
            About
          </Link>
        </div>

        {/* Right: Contact & Social */}
        <div className="flex flex-col items-center md:items-end space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-[#06B6D4]">✉️</span>
            <span className="text-gray-300">support@resolvenow.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#06B6D4]">📞</span>
            <span className="text-gray-300">1-800-RESOLVE</span>
          </div>
          <div className="flex space-x-3 pt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path d="M22.46 6...z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path d="M22.675 0...z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] text-gray-400">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path d="M19 0...z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-6 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ResolveNow. All rights reserved.
      </div>
    </footer>
  );
}
