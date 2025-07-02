import axios from "axios";
import React, { useState, useEffect } from "react";

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


// Simple modal for messaging
function MessageModal({ open, onClose, complaint }) {
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  if (!open || !complaint) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-[#1F2937] rounded-lg p-6 sm:p-8 w-full max-w-md shadow-xl relative">
        <button onClick={onClose} className="absolute right-3 top-3 text-white text-lg">✕</button>
        <h3 className="text-xl font-bold text-[#06B6D4] mb-4">Message: {complaint.title}</h3>
        <textarea
          className="w-full bg-gray-800 border border-[#06B6D4] rounded-lg p-3 text-white mb-4"
          rows={4}
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className="bg-[#06B6D4] text-[#1F2937] px-6 py-2 rounded-lg font-bold hover:bg-[#0891B2] transition shadow-lg w-full"
          onClick={() => {
            setMessage("");
            onClose();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// Complaint card
function ComplaintCard({ complaint, expandedComplaint, setExpandedComplaint, onMessage }) {
  const API_URL = import.meta.env.VITE_API_URL;
  return (
    <div className="bg-[#1F2937] rounded-xl shadow-lg p-6 border-l-4 border-[#06B6D4] transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <div className="flex flex-wrap items-center mb-2 gap-2">
            <h3 className="text-xl font-semibold text-white">{complaint.title}</h3>
            <StatusBadge status={complaint.status} />
          </div>
          <p className="text-gray-300 mb-2">{complaint.description}</p>
          <p className="text-xs text-gray-400">{new Date(Number(complaint.createdAt)).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              setExpandedComplaint(expandedComplaint === complaint._id ? null : complaint._id)
            }
            className="bg-[#06B6D4]/10 text-[#06B6D4] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#06B6D4]/20 transition"
          >
            {expandedComplaint === complaint._id ? "Hide Details" : "View Details"}
          </button>
          {/* <button
            className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition"
            onClick={() => onMessage(complaint)}
          >
            Message
          </button> */}
        </div>
      </div>
      {expandedComplaint === complaint._id && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#06B6D4] mb-2">Complaint Details</h4>
              <p className="text-gray-300 mb-4">{complaint.description}</p>
              <div className="mb-4">
                <h4 className="font-medium text-[#06B6D4] mb-2">User Information</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><span className="font-semibold text-white">Name:</span> {complaint.name}</li>
                  <li><span className="font-semibold text-white">Email:</span> {complaint.email}</li>
                  <li><span className="font-semibold text-white">Phone:</span> {complaint.phone}</li>
                  <li><span className="font-semibold text-white">Address:</span> {complaint.address}</li>
                </ul>
              </div>
              {complaint.attachments && complaint.attachments.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-[#06B6D4] mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {complaint.attachments.map((_, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-gray-800 rounded-md flex items-center justify-center"
                      >
                        <img 
                           src={`${API_URL}/${complaint.attachments[0]}`}
                           alt="📷"
                          className="w-full h-full object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-300 z-50" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium text-[#06B6D4] mb-2">Status Updates</h4>
              <div className="space-y-4">
                {complaint.statusHistory?.map((update, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center">
                        <span className="text-[#06B6D4] text-sm">{update.icon}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{update.message}</p>
                      <p className="text-xs text-gray-400">{update.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [messageComplaint, setMessageComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
   const [filter, setFilter] = useState("all");
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?._id;
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(()=>{
    const fetchComplaints =  async ()=>{
      try{
        const res = await axios.get(`${API_URL}/complaints/${userId}`)
        setComplaints(res.data);
      }catch(err){
        console.error("failed to fetch the complaints data");
      }
    }
    if(userId) fetchComplaints();
  },[userId])

  const filteredComplaints =
    filter === "all"
      ? complaints
      : complaints.filter((c) => c.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-white">My Complaints</h2>
        <div className="relative">
          <select className="block appearance-none bg-[#1F2937] border border-[#06B6D4] text-[#06B6D4] py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-[#06B6D4]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          >
           <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#06B6D4]">
            <span>▼</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-white text-center py-24 text-xl">Loading complaints...</div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center text-gray-400 py-24 text-xl">
            No complaints yet. Submit your first complaint!
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id}
              complaint={complaint}
              expandedComplaint={expandedComplaint}
              setExpandedComplaint={setExpandedComplaint}
              onMessage={setMessageComplaint}
            />
          ))
        )}
      </div>

      {/* <MessageModal
        open={!!messageComplaint}
        onClose={() => setMessageComplaint(null)}
        complaint={messageComplaint}
      /> */}
    </div>
  );
}
