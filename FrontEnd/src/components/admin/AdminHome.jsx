import React, { useState } from "react";
import { Link } from "react-router-dom";

// Example agent data
const initialAgents = [
  { id: 1, name: "Agent Sarah", email: "sarah@company.com", phone: "9876543210", complaints: 2 },
  { id: 2, name: "Agent Michael", email: "michael@company.com", phone: "9012345678", complaints: 1 },
];

// Example complaints data
const initialComplaints = [
  { id: 1, title: "Defective Product", user: "Ayesha Shaik", status: "Pending", assignedTo: null },
  { id: 2, title: "Late Service Delivery", user: "Rohan Kumar", status: "In Progress", assignedTo: null },
];

export default function AdminHome() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [agents, setAgents] = useState(initialAgents);

  const handleAssign = (complaintId) => {
    // For demo: just alert, you could open a modal here to pick agent
    alert(`Assigning complaint #${complaintId} to an agent...`);
    // Here you can implement further logic to actually assign an agent!
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Left: Links */}
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold tracking-wide">Admin</span>
            <Link to="/admin" className="hover:text-[#06B6D4] font-medium transition">Home</Link>
            <Link to="/admin/agents" className="hover:text-[#06B6D4] font-medium transition">Agents</Link>
            <Link to="/admin/complaints" className="hover:text-[#06B6D4] font-medium transition">User Complaints</Link>
          </div>
          {/* Right: Logout */}
          <button className="bg-white text-[#06B6D4] px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] shadow transition">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
        {/* Section 1: User Complaints */}
        <section>
          <h2 className="text-2xl font-bold mb-6">User Complaints</h2>
          {complaints.length === 0 ? (
            <div className="text-gray-400">No complaints to show.</div>
          ) : (
            <div className="bg-[#1F2937] rounded-xl shadow-md p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#06B6D4]">
                    <th className="py-2">ID</th>
                    <th className="py-2">Title</th>
                    <th className="py-2">User</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Assigned To</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b border-gray-700">
                      <td className="py-2">{complaint.id}</td>
                      <td className="py-2">{complaint.title}</td>
                      <td className="py-2">{complaint.user}</td>
                      <td className="py-2">{complaint.status}</td>
                      <td className="py-2">{complaint.assignedTo ? complaint.assignedTo : "Unassigned"}</td>
                      <td className="py-2">
                        <button
                          className="bg-[#06B6D4] text-[#1F2937] px-4 py-1 rounded-full font-bold hover:bg-[#0891B2] transition"
                          onClick={() => handleAssign(complaint.id)}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        
        {/* Section 2: Agents */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-[#1F2937] rounded-xl shadow-md p-6 border-l-4 border-[#06B6D4]">
                <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                <p className="text-gray-300 mb-1"><span className="font-semibold text-white">Email:</span> {agent.email}</p>
                <p className="text-gray-300 mb-1"><span className="font-semibold text-white">Phone:</span> {agent.phone}</p>
                <p className="text-gray-300"><span className="font-semibold text-white">Complaints Assigned:</span> {agent.complaints}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}