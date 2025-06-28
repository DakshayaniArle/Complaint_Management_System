// UserComplaints.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Error fetching complaints:", err));
    
     fetch("http://localhost:5000/assignments") // create this endpoint if not exists
    .then((res) => res.json())
    .then((data) => setAssignments(data))
    .catch((err) => console.error("Error fetching assignments:", err));
  }, []);

  const handleAssign = (complaintId) => {
    alert(`Assigning complaint #${complaintId} to an agent...`);
    // Implement agent assignment logic here
  };

   const getAssignedAgentName = (complaintId) => {
  const assignment = assignments.find(
    (a) => a.complaintId === complaintId
  );
  return assignment ? assignment.agent : "Unassigned";
};

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
      {complaints.length === 0 ? (
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
                <th className="py-2"></th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <React.Fragment key={complaint._id}>
                  <tr className="border-b border-gray-700 text-white">
                    <td className="py-2">{complaint._id}</td>
                    <td className="py-2">{complaint.title}</td>
                    <td className="py-2">{complaint.name}</td>
                    <td className="py-2">{complaint.status}</td>
                    <td className="py-2">{getAssignedAgentName(complaint._id)}</td>
                    <td className="py-2">
                      <button
                        className="bg-[#06B6D4] text-[#1F2937] px-4 py-1 rounded-full font-bold hover:bg-[#0891B2] transition"
                        onClick={() => handleAssign(complaint._id)}
                      >
                        Assign
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                        className="bg-gray-700 text-[#06B6D4] px-4 py-1 rounded-full font-medium hover:bg-[#0891B2] hover:text-white transition"
                        onClick={() => setExpandedId(expandedId === complaint._id ? null : complaint._id)}
                      >
                        {expandedId === complaint._id ? "Hide Info" : "More Info"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === complaint._id && (
                    <tr>
                      <td colSpan={7} className="bg-[#232B36] rounded-lg p-4 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h4 className="font-semibold text-[#06B6D4] mb-2">User Details</h4>
                            <ul className="text-gray-200 text-sm space-y-1">
                              <li><span className="font-semibold text-white">Name:</span> {complaint.name}</li>
                              <li><span className="font-semibold text-white">Email:</span> {complaint.email}</li>
                              <li><span className="font-semibold text-white">Phone:</span> {complaint.phone}</li>
                              <li><span className="font-semibold text-white">Address:</span> {complaint.address}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#06B6D4] mb-2">Complaint Details</h4>
                            <ul className="text-gray-200 text-sm space-y-1">
                              <li><span className="font-semibold text-white">Title:</span> {complaint.title}</li>
                              <li><span className="font-semibold text-white">Description:</span> {complaint.description}</li>
                              <li><span className="font-semibold text-white">Date:</span> {new Date(Number(complaint.createdAt)).toLocaleString()}</li>
                              <li><span className="font-semibold text-white">Status:</span> {complaint.status}</li>
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
