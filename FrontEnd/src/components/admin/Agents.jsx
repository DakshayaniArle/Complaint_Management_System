import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [noOfComplaints,setNoOfComplaints] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    fetch(`${API_URL}/admin/agents`)
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));

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
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Agents</h2>
        <Link
          to="/admin"
          className="bg-[#06B6D4] text-[#1F2937] px-4 py-2 rounded-full font-medium hover:bg-[#0891B2] transition"
        >
          Back to Home
        </Link>
      </div>

      {agents.length === 0 ? (
        <p className="text-gray-400">No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-[#1F2937] rounded-xl shadow-md p-6 border-l-4 border-[#06B6D4]"
            >
              <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold text-white">Email:</span> {agent.email}
              </p>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold text-white">AgentId:</span> {agent._id}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Complaints Assigned:</span>{" "} {noOfComplaints[agent._id]||0}
  
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
