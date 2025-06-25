import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Voice Matters</h1>
            <p className="text-lg text-white mb-8 max-w-xl">
              ResolveNow provides a seamless platform to register and track your complaints.
              Our system ensures your concerns are heard and addressed promptly by the right people.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Link to="/login">
                <button className="bg-[#06B6D4] text-[#1F2937] px-8 py-3 rounded-full font-bold hover:bg-[#0891B2] transition shadow-lg">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="border-2 border-[#06B6D4] text-[#06B6D4] px-8 py-3 rounded-full font-bold hover:bg-[#06B6D4] hover:text-[#1F2937] transition shadow-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/complaints.jpg"
              alt="Illustration"
              className="w-80 md:w-[400px] object-contain"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { icon: '👤', title: 'Register Your Account', text: 'Create your secure account in minutes with just basic information.' },
            { icon: '✏️', title: 'Submit Your Complaint', text: 'Provide details about your issue with our guided complaint form.' },
            { icon: '📈', title: 'Track Resolution', text: 'Monitor progress and communicate directly with assigned agents.' }
          ].map(({ icon, title, text }) => (
            <div key={title} className="bg-[#1F2937] p-6 rounded-xl shadow-md text-center border-t-4 border-[#06B6D4] hover:scale-105 transition">
              <div className="w-16 h-16 bg-gradient-to-r from-[#1F2937] to-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">{icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
              <p className="text-gray-300">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </>
  );
}
