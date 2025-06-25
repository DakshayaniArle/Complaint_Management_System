import React, { useState } from "react";

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

function ComplaintCard({ complaint, expandedComplaint, setExpandedComplaint }) {
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
          <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-600 transition">
            💬
          </button>
        </div>
      </div>
      {expandedComplaint === complaint.id && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#06B6D4] mb-2">Complaint Details</h4>
              <p className="text-gray-300 mb-4">{complaint.fullDescription}</p>
              {complaint.attachments && (
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
                {complaint.statusHistory.map((update, index) => (
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
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  const complaints = [
    {
      id: 1,
      title: "Defective Product Received",
      status: "In Progress",
      description: "Order #12345 - Received damaged item with visible defects",
      date: "Submitted: May 15, 2023",
      fullDescription:
        "I received my order today and the product was damaged. The packaging was intact but the item inside has a visible crack on the side. I've attached photos showing the damage.",
      attachments: [1, 2],
      statusHistory: [
        { icon: "✓", message: "Complaint registered", timestamp: "May 15, 2023 at 10:30 AM" },
        { icon: "👤", message: "Assigned to Agent Sarah", timestamp: "May 15, 2023 at 2:15 PM" },
        { icon: "⟳", message: "Under review", timestamp: "May 16, 2023 at 9:00 AM" },
      ],
    },
    {
      id: 2,
      title: "Late Service Delivery",
      status: "Resolved",
      description: "Service Request #67890 - Technician arrived 3 hours late",
      date: "Submitted: April 28, 2023 | Resolved: May 5, 2023",
      fullDescription:
        "The technician arrived 3 hours later than the scheduled appointment window, causing me to miss an important meeting. I had taken time off work specifically for this appointment.",
      statusHistory: [
        { icon: "✓", message: "Complaint registered", timestamp: "April 28, 2023 at 6:45 PM" },
        { icon: "👤", message: "Assigned to Agent Michael", timestamp: "April 29, 2023 at 10:00 AM" },
        { icon: "⟳", message: "Under review", timestamp: "April 29, 2023 at 10:30 AM" },
        { icon: "✅", message: "Resolved", timestamp: "May 5, 2023 at 2:00 PM" },
      ],
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
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
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            expandedComplaint={expandedComplaint}
            setExpandedComplaint={setExpandedComplaint}
          />
        ))}
      </div>
    </div>
  );
}