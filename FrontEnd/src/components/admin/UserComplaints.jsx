import React, { useState } from "react";

const initialComplaints = [
  {
    id: 1,
    title: "Defective Product",
    user: "Pallavi",
    status: "Pending",
    assignedTo: null,
    name: "Ayesha Shaik",
    phone: "9876543210",
    email: "ayesha@example.com",
    address: "123 Main St, Hyderabad",
    description: "Received a product with defects. The package was intact but the item was broken.",
    date: "2025-06-24",
  },
  {
    id: 2,
    title: "Late Service Delivery",
    user: "Rohan Kumar",
    status: "In Progress",
    assignedTo: null,
    name: "Rohan Kumar",
    phone: "9012345678",
    email: "rohan@example.com",
    address: "456 Park Lane, Bengaluru",
    description: "Service was delivered 3 hours late. Missed my meeting.",
    date: "2025-06-23",
  },
];

export default function UserComplaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [expandedId, setExpandedId] = useState(null);

  const handleAssign = (complaintId) => {
    alert(`Assigning complaint #${complaintId} to an agent...`);
    // Expand with assignment logic if needed
  };

  return (
    <div className="max-w-5xl mx-auto py-10 text-white">
      <h2 className="text-3xl font-bold mb-8">User Complaints</h2>
      {complaints.length === 0 ? (
        <div className="text-gray-400">No complaints to show.</div>
      ) : (
        <div className="bg-[#1F2937] rounded-xl shadow-md p-6">
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
                <React.Fragment key={complaint.id}>
                  <tr className="border-b border-gray-700 text-white">
                    <td className="py-2">{complaint.id}</td>
                    <td className="py-2">{complaint.title}</td>
                    <td className="py-2">{complaint.user}</td>
                    <td className="py-2">{complaint.status}</td>
                    <td className="py-2">
                      {complaint.assignedTo ? complaint.assignedTo : "Unassigned"}
                    </td>
                    <td className="py-2">
                      <button
                        className="bg-[#06B6D4] text-[#1F2937] px-4 py-1 rounded-full font-bold hover:bg-[#0891B2] transition"
                        onClick={() => handleAssign(complaint.id)}
                      >
                        Assign
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                        className="bg-gray-700 text-[#06B6D4] px-4 py-1 rounded-full font-medium hover:bg-[#0891B2] hover:text-white transition"
                        onClick={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}
                      >
                        {expandedId === complaint.id ? "Hide Info" : "More Info"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === complaint.id && (
                    <tr>
                      <td colSpan={7} className="bg-[#232B36] rounded-lg p-4 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                          <div>
                            <h4 className="font-semibold text-[#06B6D4] mb-2">User Details</h4>
                            <ul className="text-gray-200 text-sm space-y-1">
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
                            <h4 className="font-semibold text-[#06B6D4] mb-2">Complaint Details</h4>
                            <ul className="text-gray-200 text-sm space-y-1">
                              <li>
                                <span className="font-semibold text-white">Title:</span> {complaint.title}
                              </li>
                              <li>
                                <span className="font-semibold text-white">Description:</span> {complaint.description}
                              </li>
                              <li>
                                <span className="font-semibold text-white">Date:</span> {complaint.date}
                              </li>
                              <li>
                                <span className="font-semibold text-white">Status:</span> {complaint.status}
                              </li>
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