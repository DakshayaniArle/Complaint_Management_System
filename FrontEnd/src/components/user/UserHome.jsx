import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function UserHome() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-12">
        {/* Main Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl mx-auto mt-16 gap-10">
          {/* Left: Text + Cards */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Welcome to ResolveNow
            </h1>
            <p className="text-lg text-white mb-8 max-w-xl mx-auto md:mx-0">
              ResolveNow empowers you to quickly log complaints, monitor their
              progress, and view your complaint history—all in one place.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-[#0f172a] border-l-4 border-[#06B6D4] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#06B6D4] mb-2">
                  Log a Complaint
                </h2>
                <p className="text-gray-300 mb-4">
                  Facing an issue? Click below to register a new complaint and
                  get it resolved swiftly by our support team.
                </p>
                <Link to="/user/submit">
                  <button className="bg-[#06B6D4] text-[#1F2937] px-6 py-2 rounded-full font-bold hover:bg-[#0891B2] transition shadow-lg">
                    Register a Complaint
                  </button>
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0f172a] border-l-4 border-[#06B6D4] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#06B6D4] mb-2">
                  Track Status
                </h2>
                <p className="text-gray-300 mb-4">
                  Stay up-to-date with your complaint's progress. View live
                  status, updates, and resolution timelines.
                </p>
                <Link to="/user/status">
                  <button className="border-2 border-[#06B6D4] text-[#06B6D4] px-6 py-2 rounded-full font-bold hover:bg-[#06B6D4] hover:text-[#1F2937] transition shadow-lg w-full">
                    View Status
                  </button>
                </Link>
              </div>

              {/* Card 3 (full width) */}
              <div className="bg-[#0f172a] border-l-4 border-[#06B6D4] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 sm:col-span-2">
                <h2 className="text-2xl font-bold text-[#06B6D4] mb-2">
                  Complaint History
                </h2>
                <p className="text-gray-300 mb-4">
                  Access a complete log of your submitted complaints, status
                  changes, and resolutions at any time.
                </p>
                <Link to="/user/complaints">
                  <button className="border-2 border-[#06B6D4] text-[#06B6D4] px-6 py-2 rounded-full font-bold hover:bg-[#06B6D4] hover:text-[#1F2937] transition shadow-lg w-full">
                    My Complaints
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/complaint.jpg"
              alt="Dashboard Illustration"
              className="w-64 sm:w-80 md:w-[400px] object-contain"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="w-full mt-16">
          <Footer />
        </div>
      </div>
    </>
  );
}
