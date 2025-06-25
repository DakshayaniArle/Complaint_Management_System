import React from "react";

const agents = [
  {
    id: 1,
    name: "Agent Sarah",
    email: "sarah@company.com",
    phone: "9876543210",
    complaints: 2,
    profile: "Experienced in product support and quick resolution.",
  },
  {
    id: 2,
    name: "Agent Michael",
    email: "michael@company.com",
    phone: "9012345678",
    complaints: 1,
    profile: "Expert at handling service delays and escalations.",
  },
];

export default function Agents() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-white mb-8">Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#1F2937] rounded-xl shadow-md p-6 border-l-4 border-[#06B6D4]"
          >
            <h3 className="text-lg font-bold mb-2">{agent.name}</h3>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold text-white">Email:</span> {agent.email}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold text-white">Phone:</span> {agent.phone}
            </p>
            <p className="text-gray-300 mb-1">
              <span className="font-semibold text-white">Profile:</span> {agent.profile}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Complaints Assigned:</span> {agent.complaints}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}