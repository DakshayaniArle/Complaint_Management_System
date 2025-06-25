import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] w-full  border-t-2 border-[#06B6D4]">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Left: Logo and tagline */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl text-[#06B6D4]"></span>
          <span className="text-xl font-bold text-white">ResolveNow</span>
          <span className="hidden md:inline text-gray-400 pl-3 border-l border-gray-600 ml-3">
            Your voice, resolved.
          </span>
        </div>
        {/* Middle: Links */}
        
        {/* Right: Contact & Social */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[#06B6D4]">✉️</span>
            <span className="text-gray-300">support@resolvenow.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#06B6D4]">📞</span>
            <span className="text-gray-300">1-800-RESOLVE</span>
          </div>
          <div className="mt-2 flex space-x-3">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] text-gray-400 transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path d="M22.46 6c-.77.35-1.6.6-2.47.7a4.3 4.3 0 0 0 1.89-2.38 8.61 8.61 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.4 0-4.36 2.05-3.79 4.37a12.14 12.14 0 0 1-8.82-4.48s-1.79 3.05.84 4.49A4.23 4.23 0 0 1 2 7.65c0 1.94 1.35 3.55 3.34 3.93a4.37 4.37 0 0 1-1.93.07c.54 1.69 2.09 2.92 3.94 2.95A8.61 8.61 0 0 1 2 19.53a12.06 12.06 0 0 0 6.6 1.94c7.92 0 12.25-6.56 12.25-12.25 0-.19 0-.39-.02-.58A8.7 8.7 0 0 0 24 4.59a8.76 8.76 0 0 1-2.54.7z"/></svg>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] text-gray-400 transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.333 24h11.495v-9.294H9.692V11.06h3.136V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.144v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.646h-3.12V24h6.116c.736 0 1.333-.597 1.333-1.334V1.333C24 .597 23.403 0 22.675 0z"/></svg>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#06B6D4] text-gray-400 transition">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5"><path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zm-9.3 19H5v-8h4.7v8zm-2.3-9.2c-1.5 0-2.5-1-2.5-2.3C4.2 6.5 5.2 5.5 6.7 5.5c1.5 0 2.5 1 2.5 2.3 0 1.3-1 2.3-2.5 2.3zm13.3 9.2h-4.7v-4c0-1-.3-1.7-1.2-1.7s-1.5.8-1.5 1.8v3.9h-4.7v-8h4.7v1.1h.1c.6-.9 1.7-1.1 2.8-1.1 2.1 0 3.7 1.3 3.7 4.1v4.9z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ResolveNow. All rights reserved.
      </div>
    </footer>
  );
}