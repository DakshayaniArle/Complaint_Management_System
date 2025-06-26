import React from "react";
import { Link } from "react-router-dom";

import Footer from "./Footer"; // Adjust path as needed

export default function UserHome() {
  return (
    <>
      <div className="bg-gray-900 min-h-[70vh] flex flex-col justify-center items-center px-4 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 mt-24">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to ResolveNow</h1>
            <p className="text-lg text-white mb-8 max-w-xl">
              ResolveNow empowers you to quickly log complaints, monitor their progress, and view your complaint history—all in one place.
            </p>
            {/* Interactive Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Card 1: Log a Complaint */}
              <div className="bg-[#0f172a] border-l-4 border-[#06B6D4] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#06B6D4] mb-2">Log a Complaint</h2>
                <p className="text-gray-300 mb-4">
                  Facing an issue? Click below to register a new complaint and get it resolved swiftly by our support team.
                </p>
                <Link to="/user/submit">
                  <button className="bg-[#06B6D4] text-[#1F2937] px-6 py-2 rounded-full font-bold hover:bg-[#0891B2] transition shadow-lg">
                    Register a Complaint
                  </button>
                </Link>
              </div>
              {/* Card 2: Track Status */}
              <div className="bg-[#0f172a] border-l-4 border-[#06B6D4] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#06B6D4] mb-2">Track Status</h2>
                <p className="text-gray-300 mb-4">
                  Stay up-to-date with your complaint's progress. View live status, updates, and resolution timelines.
                </p>
                <Link to="/user/status">
                  <button className="border-2 border-[#06B6D4] text-[#06B6D4] px-6 py-2 rounded-full font-bold hover:bg-[#06B6D4] hover:text-[#1F2937] transition shadow-lg">
                    View Status
                  </button>
                </Link>
              </div>
              {/* Card 3: Your Complaint History */}
              <div className="bg-[#0f172a] border-l-4 border-[#06B6D4] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 sm:col-span-2">
                <h2 className="text-2xl font-bold text-[#06B6D4] mb-2">Complaint History</h2>
                <p className="text-gray-300 mb-4">
                  Access a complete log of your submitted complaints, status changes, and resolutions at any time.
                </p>
                <Link to="/user/complaints">
                  <button className="border-2 border-[#06B6D4] text-[#06B6D4] px-6 py-2 rounded-full font-bold hover:bg-[#06B6D4] hover:text-[#1F2937] transition shadow-lg">
                    My Complaints
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/complaint.jpg"
              alt="Dashboard Illustration"
              className="w-80 md:w-[400px] object-contain"
            />
          </div>
        </div>
        {/* Footer with top padding for spacing */}
        <div className="w-full pt-12">
          <Footer />
        </div>
      </div>
    </>
  );
}