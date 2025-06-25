import React, { createContext, useContext, useState } from "react";

const ComplaintContext = createContext();

export function useComplaints() {
  return useContext(ComplaintContext);
}

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState([]);

  const addComplaint = (complaint) => {
    setComplaints((prev) => [
      ...prev,
      {
        ...complaint,
        id: Date.now(),
        status: "Pending",
        statusHistory: [
          {
            icon: "✓",
            message: "Complaint registered",
            timestamp: new Date().toLocaleString(),
          },
        ],
      },
    ]);
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
}