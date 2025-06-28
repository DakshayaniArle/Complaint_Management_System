// AgentComplaints.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AGENT_LOGO_URL = "https://ui-avatars.com/api/?name=Agent+Sarah&background=06B6D4&color=fff";
const statusOptions = ["Pending", "In Progress", "Resolved", "Rejected"];

export default function AgentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [expandedId, setExpandedId] = useState([]);
  const [messageInputs, setMessageInputs] = useState({});
  const [statusEditId, setStatusEditId] = useState(null);
  const [statusDrafts, setStatusDrafts] = useState({});
  const navigate = useNavigate();
  const user =JSON.parse(localStorage.getItem("userData"));
  const AGENT_NAME = user.name;

  useEffect(() => {
    const fetchComplaints = async () => {
      // const user = JSON.parse(localStorage.getItem("userData")); // Must have _id
      try {
        const res = await fetch(`http://localhost:5000/agent/${user._id}/complaints`);
        const data = await res.json();
        console.log(data);
        setComplaints(data);
      } catch (err) {
        console.error("Failed to fetch complaints", err);
      }
    };

    fetchComplaints();
  }, []);
  

  const handleLogout = () => {
    // Clear session data if needed
    localStorage.removeItem(user);
    navigate("/login");
  };

  const handleEditStatus = (id, currentStatus) => {
    setStatusEditId(id);
    setStatusDrafts((drafts) => ({ ...drafts, [id]: currentStatus }));
  };

  // const handleConfirmStatus = (id) => {
  //   const updatedStatus = statusDrafts[id];
  //   fetch(`http://localhost:5000/api/complaints/${id}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ status: updatedStatus }),
  //   })
  //     .then((res) => res.json())
  //     .then((updatedComplaint) => {
  //       setComplaints((prev) =>
  //         prev.map((c) => (c._id === id ? updatedComplaint : c))
  //       );
  //       setStatusEditId(null);
  //     });
  // };


  const handleConfirmStatus = async (assignId) => {
  const updatedStatus = statusDrafts[assignId];
  try {
    const res = await fetch(`http://localhost:5000/assign/status/${assignId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updatedStatus }),
    });
    const updated = await res.json();
    setComplaints((prev) =>
      prev.map((c) => (c._id === assignId ? { ...c, status: updated.status } : c))
    );
    setStatusEditId(null);
  } catch (err) {
    console.error("Status update failed:", err);
  }
};


  const handleCancelStatus = () => setStatusEditId(null);

  const handleSendMessage = async (assignId) => {
  const message = messageInputs[assignId]?.trim();
  if (!message) return;

  try {
    const res = await fetch(`http://localhost:5000/assign/${assignId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message,
        from: "agent",
        timestamp: new Date().toLocaleString(),
      }),
    });
    const updated = await res.json();
    setComplaints((prev) =>
      prev.map((c) => (c._id === assignId ? updated : c))
    );
    setMessageInputs((inputs) => ({ ...inputs, [assignId]: "" }));
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] shadow-lg sticky top-0 z-40 py-3 mb-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4">
            <span className="text-xl font-bold">{AGENT_NAME}</span>
            <span className="text-sm sm:text-base text-white">User Complaints</span>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={AGENT_LOGO_URL}
              alt="Agent Logo"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <button
              onClick={handleLogout}
              className="bg-white text-[#06B6D4] px-4 py-1 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Assigned Complaints</h2>
        {complaints.length === 0 ? (
          <p className="text-gray-400">No complaints assigned.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="bg-[#1F2937] rounded-xl shadow-md p-6 border-l-4 border-[#06B6D4]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{complaint?.complaintId?.title}</h3>
                    <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs bg-[#06B6D4]/10 text-[#06B6D4]">
                      {complaint.status}
                    </span>
                    <p className="mt-2 text-sm"><span className="font-semibold">By:</span> {complaint?.complaintId?.name}</p>
                    <p className="text-xs text-gray-400">Date: {new Date(Number(complaint?.complaintId?.createdAt)).toLocaleString()}</p>
                  </div>
                  <div className="mt-1">
                    {statusEditId === complaint._id ? (
                      <div className="flex flex-col items-end space-y-2">
                        <select
                          className="bg-[#232B36] text-white border border-[#06B6D4] rounded py-1 px-2"
                          value={statusDrafts[complaint._id]}
                          onChange={(e) =>
                            setStatusDrafts((drafts) => ({
                              ...drafts,
                              [complaint._id]: e.target.value,
                            }))
                          }
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button onClick={() => handleConfirmStatus(complaint._id)} className="bg-[#06B6D4] text-[#1F2937] px-2 py-1 text-xs rounded hover:bg-[#0891B2]">Save</button>
                          <button onClick={handleCancelStatus} className="bg-gray-600 text-white px-2 py-1 text-xs rounded hover:bg-gray-700">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditStatus(complaint._id, complaint.status)}
                        className="text-xs px-3 py-1 bg-[#06B6D4] text-[#1F2937] rounded-full hover:bg-[#0891B2]"
                      >Change Status</button>
                    )}
                  </div>
                </div>

                <p className="text-sm mt-3 text-gray-200">{complaint.description}</p>
                <button
                  onClick={() => setExpandedId(expandedId === complaint._id ? null : complaint._id)}
                  className="mt-3 bg-gray-700 text-[#06B6D4] px-4 py-1 rounded-full text-sm hover:bg-[#0891B2] hover:text-white"
                >{expandedId === complaint._id ? "Hide Info" : "More Info"}</button>

                {expandedId === complaint._id && (
                  <div className="mt-4 bg-[#232B36] p-4 rounded-lg text-sm">
                    <div>
                      <h4 className="font-semibold text-[#06B6D4] mb-2">User Details</h4>
                      <ul className="text-gray-300 space-y-1 mb-3">
                        <li><b className="text-white">Name:</b> {complaint?.complaintId?.name}</li>
                        <li><b className="text-white">Email:</b> {complaint?.complaintId?.email}</li>
                        {/* <li><b className="text-white">Phone:</b> {complaint.phone}</li> */}
                        <li><b className="text-white">Address:</b> {complaint?.complaintId?.address}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#06B6D4] mb-2">Messages</h4>
                      <div className="bg-[#1F2937] rounded p-2 max-h-40 overflow-y-auto mb-2">
                        {complaint.messages?.length > 0 ? (
                          complaint.messages.map((msg, idx) => (
                            <div key={idx} className="mb-2">
                              <span className={`font-semibold ${msg.from === "agent" ? "text-[#06B6D4]" : "text-gray-200"}`}>
                                {msg.from === "agent" ? "Agent" : "User"}:
                              </span> {msg.text}
                              <div className="text-xs text-gray-500">{msg.timestamp}</div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No messages yet.</p>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <input
                          type="text"
                          value={messageInputs[complaint._id] || ""}
                          onChange={(e) =>
                            setMessageInputs((inputs) => ({
                              ...inputs,
                              [complaint._id]: e.target.value,
                            }))
                          }
                          placeholder="Type your reply..."
                          className="flex-1 px-3 py-2 rounded bg-[#232B36] text-white border border-[#06B6D4] focus:outline-none"
                        />
                        <button
                          onClick={() => handleSendMessage(complaint._id)}
                          className="bg-[#06B6D4] text-[#1F2937] px-4 py-2 rounded hover:bg-[#0891B2] font-bold"
                        >Send</button>
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
