import React, { useRef } from "react";
import { useComplaints } from "./ComplaintContext";
import { useNavigate } from "react-router-dom";

export default function SubmitComplaint() {
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      title: form.title.value,
      description: form.description.value,
      fullDescription: form.description.value,
      attachments: [], // You can handle file uploads if needed
    };
    addComplaint(data);
    alert("Complaint submitted successfully!");
    navigate("/complaints");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Submit a Complaint</h2>
      <div className="bg-[#1F2937] rounded-xl shadow-md p-8 border-t-4 border-[#06B6D4]">
        <form ref={formRef} onSubmit={handleSubmitComplaint} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] bg-[#1F2937] text-white"
                required
              />
            </div>
            <div>
              <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] bg-[#1F2937] text-white"
                required
              />
            </div>
            <div>
              <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] bg-[#1F2937] text-white"
                required
              />
            </div>
            <div>
              <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] bg-[#1F2937] text-white"
                required
              />
            </div>
          </div>
          {/* Complaint Title */}
          <div>
            <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="title">
              Complaint Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] bg-[#1F2937] text-white"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-[#06B6D4] font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full border border-[#06B6D4] rounded-lg px-4 py-2 focus:outline-none focus:border-[#06B6D4] bg-[#1F2937] text-white"
              required
            ></textarea>
          </div>
          {/* Attachments */}
          <div>
            <label className="block text-[#06B6D4] font-medium mb-2">
              Attachments (optional)
            </label>
            <div className="flex flex-col items-start space-y-2">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg shadow-md tracking-wide uppercase border border-[#06B6D4]/50 cursor-pointer hover:bg-[#06B6D4]/20 transition">
                <span className="mt-2 text-base leading-normal">
                  Drag and drop files here or click to browse
                </span>
                <input type="file" multiple className="hidden" />
              </label>
              <button
                type="button"
                className="bg-[#06B6D4]/10 text-[#06B6D4] px-4 py-2 rounded-lg hover:bg-[#06B6D4]/20 transition"
              >
                Choose Files
              </button>
            </div>
          </div>
          {/* Terms and conditions */}
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2 accent-[#06B6D4]" required />
            <label htmlFor="terms" className="text-sm text-gray-200">
              I agree to the terms and conditions and privacy policy
            </label>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-[#06B6D4] text-[#1F2937] px-6 py-3 rounded-lg font-medium hover:bg-[#0891B2] transition"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}