import React, { useState } from "react";

// Agent profile info 
const AGENT_NAME = "Agent Sarah";
const AGENT_LOGO_URL = "https://ui-avatars.com/api/?name=Agent+Sarah&background=06B6D4&color=fff"; 

const initialComplaints = [
  {
    id: 1,
    title: "Defective Product",
    user: "Ayesha Shaik",
    name: "Ayesha Shaik",
    phone: "9876543210",
    email: "ayesha@example.com",
    address: "123 Main St, Hyderabad",
    description: "Received a product with defects. The package was intact but the item was broken.",
    date: "2025-06-24",
    status: "Pending",
    messages: [
      { from: "user", text: "Please resolve this quickly.", timestamp: "2025-06-24 10:00" },
      { from: "agent", text: "We are looking into it.", timestamp: "2025-06-24 12:00" },
    ],
  },
  {
    id: 2,
    title: "Late Service Delivery",
    user: "Rohan Kumar",
    name: "Rohan Kumar",
    phone: "9012345678",
    email: "rohan@example.com",
    address: "456 Park Lane, Bengaluru",
    description: "Service was delivered 3 hours late. Missed my meeting.",
    date: "2025-06-23",
    status: "In Progress",
    messages: [
      { from: "user", text: "Why was the service late?", timestamp: "2025-06-23 17:00" },
    ],
  },
];

const statusOptions = ["Pending", "In Progress", "Resolved", "Rejected"];

export default function AgentComplaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [expandedId, setExpandedId] = useState(null);
  const [messageInputs, setMessageInputs] = useState({});
  const [statusEditId, setStatusEditId] = useState(null);
  const [statusDrafts, setStatusDrafts] = useState({});

  // Handler to start editing status
  const handleEditStatus = (id, currentStatus) => {
    setStatusEditId(id);
    setStatusDrafts((drafts) => ({
      ...drafts,
      [id]: currentStatus,
    }));
  };

  // Handler to confirm status change
  const handleConfirmStatus = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: statusDrafts[id] } : c
      )
    );
    setStatusEditId(null);
  };

  // Handler to cancel status change
  const handleCancelStatus = () => {
    setStatusEditId(null);
  };

  // Send reply handler
  const handleSendMessage = (id) => {
    const message = messageInputs[id]?.trim();
    if (!message) return;
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              messages: [
                ...(c.messages || []),
                {
                  from: "agent",
                  text: message,
                  timestamp: new Date().toLocaleString(),
                },
              ],
            }
          : c
      )
    );
    setMessageInputs((inputs) => ({ ...inputs, [id]: "" }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40 py-3 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold tracking-wide">{AGENT_NAME}</span>
            <span className="font-medium text-white">User Complaints</span>
          </div>
          <img
            src={AGENT_LOGO_URL}
            alt="Agent Logo"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-4">
        <h2 className="text-3xl font-bold mb-8">Assigned Complaints</h2>
        {complaints.length === 0 ? (
          <div className="text-gray-400">No complaints assigned.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-[#1F2937] rounded-xl shadow-lg p-6 border-l-4 border-[#06B6D4] relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{complaint.title}</h3>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#06B6D4]/10 text-[#06B6D4] mb-2">
                      {complaint.status}
                    </span>
                    <div className="mb-1">
                      <span className="font-semibold">By:</span> {complaint.user}
                    </div>
                    <div className="mb-2 text-xs text-gray-400">
                      Date: {complaint.date}
                    </div>
                  </div>
                  <div>
                    {statusEditId === complaint.id ? (
                      <div className="flex flex-col items-end">
                        <select
                          className="bg-[#232B36] text-white border border-[#06B6D4] rounded py-1 px-2 mb-2"
                          value={statusDrafts[complaint.id]}
                          onChange={(e) =>
                            setStatusDrafts((drafts) => ({
                              ...drafts,
                              [complaint.id]: e.target.value,
                            }))
                          }
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <div className="flex space-x-2">
                          <button
                            className="bg-[#06B6D4] text-[#1F2937] px-2 py-1 rounded font-bold hover:bg-[#0891B2] transition text-xs"
                            onClick={() => handleConfirmStatus(complaint.id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-600 text-white px-2 py-1 rounded font-bold hover:bg-gray-700 transition text-xs"
                            onClick={handleCancelStatus}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="bg-[#06B6D4] text-[#1F2937] px-3 py-1 rounded-full font-bold hover:bg-[#0891B2] transition text-xs"
                        onClick={() => handleEditStatus(complaint.id, complaint.status)}
                      >
                        Change Status
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-200 mb-3">{complaint.description}</p>
                <button
                  className="bg-gray-700 text-[#06B6D4] px-4 py-1 rounded-full font-medium hover:bg-[#0891B2] hover:text-white transition mb-3"
                  onClick={() =>
                    setExpandedId(expandedId === complaint.id ? null : complaint.id)
                  }
                >
                  {expandedId === complaint.id ? "Hide Info" : "More Info"}
                </button>
                {expandedId === complaint.id && (
                  <div className="bg-[#232B36] rounded-lg p-4 text-white mt-3">
                    <div>
                      <h4 className="font-semibold text-[#06B6D4] mb-2">User Details</h4>
                      <ul className="text-gray-200 text-sm space-y-1 mb-4">
                        <li>
                          <span className="font-semibold text-white">Name:</span> {complaint.name}
                        </li>
                        <li>
                          <span className="font-semibold text-white">Email:</span> {complaint.email}
                        </li>
                        <li>
                          <span className="font-semibold text-white">Phone:</span> {complaint.phone}
                        </li>
                        <li>
                          <span className="font-semibold text-white">Address:</span> {complaint.address}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#06B6D4] mb-2">Messages</h4>
                      <div className="bg-[#1F2937] rounded p-2 mb-2 max-h-40 overflow-y-auto">
                        {complaint.messages && complaint.messages.length > 0 ? (
                          complaint.messages.map((msg, idx) => (
                            <div key={idx} className="mb-2">
                              <span
                                className={
                                  msg.from === "agent"
                                    ? "text-[#06B6D4] font-semibold"
                                    : "text-gray-200 font-semibold"
                                }
                              >
                                {msg.from === "agent" ? "Agent" : "User"}:
                              </span>{" "}
                              <span className="text-white">{msg.text}</span>
                              <div className="text-xs text-gray-400">{msg.timestamp}</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-400">No messages yet.</div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={messageInputs[complaint.id] || ""}
                          onChange={e =>
                            setMessageInputs((inputs) => ({
                              ...inputs,
                              [complaint.id]: e.target.value,
                            }))
                          }
                          placeholder="Type your reply..."
                          className="flex-1 px-3 py-2 rounded bg-[#232B36] text-white border border-[#06B6D4] focus:outline-none"
                        />
                        <button
                          className="bg-[#06B6D4] text-[#1F2937] px-4 py-2 rounded font-bold hover:bg-[#0891B2] transition"
                          onClick={() => handleSendMessage(complaint.id)}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}