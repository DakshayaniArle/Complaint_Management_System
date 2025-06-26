import React, { useState, useEffect } from "react";

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
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

// Simple modal for messaging
function MessageModal({ open, onClose, complaint }) {
  const [message, setMessage] = useState("");
  if (!open || !complaint) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 mt-15">
      <div className="bg-[#1F2937] rounded-lg p-8 max-w-md w-full shadow-xl relative">
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
          className="bg-[#06B6D4] text-[#1F2937] px-6 py-2 rounded-lg font-bold hover:bg-[#0891B2] transition shadow-lg"
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
  return (
    <div className="bg-[#1F2937] rounded-xl shadow-lg p-6 border-l-4 border-[#06B6D4] transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-semibold text-white mr-3">{complaint.title}</h3>
            <StatusBadge status={complaint.status} />
          </div>
          <p className="text-gray-300 mb-2">{complaint.description}</p>
          <p className="text-xs text-gray-400">{complaint.date}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() =>
              setExpandedComplaint(expandedComplaint === complaint.id ? null : complaint.id)
            }
            className="bg-[#06B6D4]/10 text-[#06B6D4] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#06B6D4]/20 transition"
          >
            {expandedComplaint === complaint.id ? "Hide Details" : "View Details"}
          </button>
          <button
            className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition"
            onClick={() => onMessage(complaint)}
          >
            Message
          </button>
        </div>
      </div>
      {expandedComplaint === complaint.id && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#06B6D4] mb-2">Complaint Details</h4>
              <p className="text-gray-300 mb-4">{complaint.fullDescription}</p>
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
                  <div className="flex space-x-2">
                    {complaint.attachments.map((_, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-gray-800 rounded-md flex items-center justify-center"
                      >
                        📷
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
  const [loading, setLoading] = useState(true);

  {/*useEffect(() => {
    fetch("https://your-backend-api.com/complaints") 
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load complaints", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading complaints...</div>;
  }
*/}
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4 mt-15">
        <h2 className="text-3xl font-bold text-white">My Complaints</h2>
        <div className="relative">
          <select className="block appearance-none bg-[#1F2937] border border-[#06B6D4] text-[#06B6D4] py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-[#06B6D4]">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Rejected</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#06B6D4]">
            <span>▼</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {complaints.length === 0 ? (
          <div className="text-center text-gray-400 py-24 text-xl">
            No complaints yet. Submit your first complaint!
          </div>
        ) : (
          complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              expandedComplaint={expandedComplaint}
              setExpandedComplaint={setExpandedComplaint}
              onMessage={setMessageComplaint}
            />
          ))
        )}
      </div>

      <MessageModal
        open={!!messageComplaint}
        onClose={() => setMessageComplaint(null)}
        complaint={messageComplaint}
      />
    </div>
  );
}
