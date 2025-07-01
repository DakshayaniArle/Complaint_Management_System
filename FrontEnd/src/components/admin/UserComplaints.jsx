import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;
  
  

  const fetchComplaints = () => {
    fetch(`${API_URL}/admin/complaints`)
      .then((res) => res.json())
      .then((data) => {setComplaints(data)})
      .catch((err) => console.error("Error fetching complaints:", err));
  };

  useEffect(() => {
     fetch(`${API_URL}/assignments`) 
    .then((res) => res.json())
    .then((data) => setAssignments(data))
    .catch((err) => console.error("Error fetching assignments:", err));
    fetchComplaints();
  }, []);

  const handleToggleExpand = (complaintId) => {
    setExpandedIds((prev) =>
      prev.includes(complaintId)
        ? prev.filter((id) => id !== complaintId)
        : [...prev, complaintId]
    );
  };

    const getAssignedAgentName = (complaintId) => {
  const assignment = assignments.find(
    (a) => a.complaintId === complaintId
  );
  return assignment ? assignment.agent : "Unassigned";
};

    const filteredComplaints = complaints.filter((c) => {
  const matchStatus =
    filter === "all" || c.status.toLowerCase() === filter.toLowerCase();

  const assignedAgent = getAssignedAgentName(c._id);
  const matchAgent =
    agentFilter === "all" || assignedAgent === agentFilter;

  return matchStatus && matchAgent;
});



  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">User Complaints</h2>
        <Link
          to="/admin"
          className="bg-[#06B6D4] text-[#1F2937] px-4 py-2 rounded-full font-medium hover:bg-[#0891B2] transition"
        >
          Back to Home
        </Link>
      </div>

    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div className="flex flex-col sm:flex-row items-center gap-4">
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

  <div className="flex flex-col sm:flex-row items-center gap-4">
    <label className="text-[#06B6D4] font-medium">Filter by Agent:</label>
    <select
      className="bg-[#1F2937] border border-[#06B6D4] text-[#06B6D4] py-2 px-4 rounded-full focus:outline-none"
      value={agentFilter}
      onChange={(e) => setAgentFilter(e.target.value)}
    >
      <option value="all">All</option>
      {
        [...new Set(assignments.map((a) => a.agent))].map((agent) => (
          <option key={agent} value={agent}>{agent}</option>
        ))
      }
    </select>
  </div>
</div>


      {filteredComplaints.length === 0 ? (
        <div className="text-gray-400">No complaints to show.</div>
      ) : (
        <div className="bg-[#1F2937] rounded-xl shadow-md p-6 overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-[#06B6D4] text-white">
                <th className="py-2">ID</th>
                <th className="py-2">Title</th>
                <th className="py-2">User</th>
                <th className="py-2">Status</th>
                <th className="py-2">Assigned To</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <React.Fragment key={complaint._id}>
                  <tr className="border-b border-gray-700 text-white">
                    <td className="py-2">{complaint._id}</td>
                    <td className="py-2">{complaint.title}</td>
                    <td className="py-2">{complaint.name}</td>
                    <td className="py-2">{complaint.status}</td>
                    <td className="py-2">
                     {getAssignedAgentName(complaint._id)}
                    </td>
                    <td className="py-2">
                      <button
                        className="bg-gray-700 text-[#06B6D4] px-4 py-1 rounded-full font-medium hover:bg-[#0891B2] hover:text-white transition"
                        onClick={() => handleToggleExpand(complaint._id)}
                      >
                        {expandedIds.includes(complaint._id) ? "Hide Info" : "More Info"}
                      </button>
                    </td>
                  </tr>

                  {expandedIds.includes(complaint._id) && (
                    <tr>
                      <td colSpan={7} className="bg-[#232B36] p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h4 className="font-semibold text-[#06B6D4] mb-2">User Details</h4>
                            <ul className="text-gray-200 text-sm space-y-1">
                              <li><strong>Name:</strong> {complaint.name}</li>
                              <li><strong>Email:</strong> {complaint.email}</li>
                              <li><strong>Phone:</strong> {complaint.phone}</li>
                              <li><strong>Address:</strong> {complaint.address}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#06B6D4] mb-2">Complaint Details</h4>
                            <ul className="text-gray-200 text-sm space-y-1">
                              <li><strong>Title:</strong> {complaint.title}</li>
                              <li><strong>Description:</strong> {complaint.description}</li>
                              <li><strong>Date:</strong> {new Date(Number(complaint.createdAt)).toLocaleString()}</li>
                              <li><strong>Status:</strong> {complaint.status}</li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
