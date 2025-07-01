// AdminHome.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AdminHome() {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [noOfComplaints,setNoOfComplaints] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchComplaints = async () => {
    try{
      const res = await fetch(`${API_URL}/admin/complaints`);
     const data = await res.json();
    //  console.log(data);
     const unresolved = data.filter(
        (assignment) => assignment.status !== "Resolved"
      );
      // console.log(unresolved);
      setComplaints(unresolved);
    }catch{(err) => console.error("Error fetching complaints:", err)};
    }
    fetch(`${API_URL}/admin/agents`)
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));

    fetch(`${API_URL}/assignments`) 
    .then((res) => res.json())
    .then((data) => setAssignments(data))
    .catch((err) => console.error("Error fetching assignments:", err));

    fetch(`${API_URL}/admin/agents`)
    .then((res) => res.json())
    .then((agentsData) => {
      // For each agent, fetch their assigned complaint count
      Promise.all(
        agentsData.map(async (agent) => {
          const res = await fetch(`${API_URL}/admin/agents/${agent._id}/complaint-count`);
          const { count } = await res.json();
          return { ...agent, assignedCount: count };
        })
      ).then((agentsWithCounts) => {
        const complaintsCountMap = {};
        agentsWithCounts.forEach(agent => {
            complaintsCountMap[agent._id] = agent.assignedCount;
        });
        setNoOfComplaints(complaintsCountMap);
      });
    })
    fetchComplaints();
  }, []);

  const handleAssign = async (complaint) => {
    try{
    const agentId = prompt("Enter Agent ID to assign:");
    if (!agentId) return;
    const assignData = {
  agentId: agentId,
  complaintId: complaint._id,
  status: complaint.status,
  assignedAt: Date.now(),
};

 const res = await fetch(`${API_URL}/assign`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(assignData)
 });
 const data = await res.json();

 alert("Complaint assigned to " + data.name);
  }catch(err){
    console.error("Failed to assign complaint",err);
  }
  }

  const isAssigned = (complaintId) => {
  return assignments.some((a) => a.complaintId === complaintId);
};

   const getAssignedAgentName = (complaintId) => {
  const assignment = assignments.find(
    (a) => a.complaintId === complaintId
  );
  return assignment ? assignment.agent : "Unassigned";
};
  const handleLogOut = ()=>{
    localStorage.removeItem("userData");
    navigate('/login');
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <nav className="bg-gradient-to-r from-[#1F2937] to-[#06B6D4] text-white shadow-lg sticky top-0 z-40 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold tracking-wide">Hi,Admin {user.name}</span>
            <Link to="/admin" className="hover:text-[#06B6D4] font-medium transition">Home</Link>
            <Link to="/admin/agents" className="hover:text-[#06B6D4] font-medium transition">Agents</Link>
            <Link to="/admin/complaints" className="hover:text-[#06B6D4] font-medium transition">Overall Data</Link>
          </div>
          <button className="bg-white text-[#06B6D4] px-4 py-2 rounded-full font-medium hover:bg-[#06B6D4] hover:text-white border border-[#06B6D4] shadow transition"
          onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">User Complaints</h2>
          {complaints.length === 0  ? (
            <div className="text-gray-400">Upto now all complaints are Resolved...No complaints to show.</div>
          ) : (
            <div className="bg-[#1F2937] rounded-xl shadow-md p-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#06B6D4]">
                    <th className="py-2">ID</th>
                    <th className="py-2">Title</th>
                    <th className="py-2">User</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Assigned To</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint._id} className="border-b border-gray-700">
                      <td className="py-2">{complaint._id}</td>
                      <td className="py-2">{complaint.title}</td>
                      <td className="py-2">{complaint.name}</td>
                      <td className="py-2">{complaint.status}</td>
                      <td className="py-2"> {getAssignedAgentName(complaint._id)}</td>
                      <td className="py-2">
                        {isAssigned(complaint._id) ? (
                          <button
                          className="bg-[#06B6D4] text-[#1F2937] px-3 py-1 rounded-full font-bold hover:bg-[#0891B2] transition"
                          disabled
                        >Assigned</button>
                        ) : (
                          <button
                          className="bg-[#06B6D4] text-[#1F2937] px-3 py-1 rounded-full font-bold hover:bg-[#0891B2] transition"
                          onClick={() => handleAssign(complaint)}
                        >Assign</button>
                        )}
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <div key={agent._id} className="bg-[#1F2937] rounded-xl shadow-md p-6 border-l-4 border-[#06B6D4]">
                <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
                <p className="text-gray-300 mb-1"><span className="font-semibold text-white">Email:</span> {agent.email}</p>
                <p className="text-gray-300 mb-1"><span className="font-semibold text-white">AgentId:</span> {agent._id}</p>
                <p className="text-gray-300"><span className="font-semibold text-white">Complaints Assigned:</span> {noOfComplaints[agent._id]||0}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
