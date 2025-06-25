import React from "react";
export default function About() {
  return (
    <div className="max-w-4xl mx-auto mt-15">
      <h2 className="text-3xl font-bold text-white mb-8">About ResolveNow</h2>
      <div className="bg-[#1F2937] rounded-xl shadow-md p-8 border-t-4 border-[#06B6D4]">
        <div className="prose prose-lg max-w-none prose-invert">
          <p className="text-gray-300 mb-6">
            ResolveNow is a comprehensive online complaint registration and management system designed to
            streamline the process of submitting, tracking, and resolving complaints efficiently.
          </p>
          <h3 className="text-xl font-semibold text-[#06B6D4] mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <div>
                <h4 className="font-medium text-white">User Registration</h4>
                <p className="text-gray-300">Secure account creation with email verification</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <div>
                <h4 className="font-medium text-white">Real-time Tracking</h4>
                <p className="text-gray-300">Monitor complaint status and progress updates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <div>
                <h4 className="font-medium text-white">Agent Communication</h4>
                <p className="text-gray-300">Direct interaction with assigned support agents</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-400 text-xl mt-1">✓</span>
              <div>
                <h4 className="font-medium text-white">Secure & Confidential</h4>
                <p className="text-gray-300">Data encryption and privacy protection</p>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-[#06B6D4] mb-4">Contact Information</h3>
          <div className="bg-[#1F2937]/60 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-[#06B6D4]">✉️</span>
                <span className="text-white">support@resolvenow.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[#06B6D4]">📞</span>
                <span className="text-white">1-800-RESOLVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}