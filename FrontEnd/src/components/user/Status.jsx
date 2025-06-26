import React, { useState } from "react";
import { useComplaints } from "./ComplaintContext";

// Status badge component
function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-[#06B6D4]/10 text-[#06B6D4]";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export default function Status() {
  const { complaints } = useComplaints();
  const [filter, setFilter] = useState("all");

  const filteredComplaints =
    filter === "all"
      ? complaints
      : complaints.filter((c) => c.status.toLowerCase() === filter);

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

      {/* Complaints */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-lg">
          No complaints to show.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-[#1F2937] rounded-xl shadow-md p-5 border-l-4 border-[#06B6D4] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                <p className="text-gray-300 mt-1">{complaint.description}</p>
                <p className="text-xs text-gray-400 mt-1">{complaint.date}</p>
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
