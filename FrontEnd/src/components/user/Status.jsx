import React, { useState, useEffect } from "react";
import axios from "axios";

// Status badge component
function StatusBadge({ status }) {

  const normalized = typeof status === "string" ? status.toLowerCase() : "";

  const getStatusColor = () => {
    switch (normalized) {
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
    >
      {status}
    </span>
  );
}

export default function Status() {

  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;
  

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${API_URL}/complaints/${userId}`);
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints data", err);
      }
    };

    if (userId) fetchComplaints();
  }, [userId]);

  const filteredComplaints =
    filter === "all"
      ? complaints
      : complaints.filter((c) => c.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center sm:text-left">
        Complaint Status
      </h2>

      {/* Filter dropdown */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <label className="text-[#06B6D4] font-medium">Filter by Status:</label>
        <select
          className="bg-[#1F2937] border border-[#06B6D4] text-[#06B6D4] py-2 px-4 rounded-full focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Complaints List */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-lg">
          No complaints to show.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-[#1F2937] rounded-xl shadow-md p-5 border-l-4 border-[#06B6D4] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                <p className="text-gray-300 mt-1">{complaint.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(Number(complaint.createdAt)).toLocaleString()}
                </p>
              </div>
              <div className="self-start sm:self-center">
                <StatusBadge status={complaint.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
