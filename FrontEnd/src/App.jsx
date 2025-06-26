import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ComplaintProvider } from "./components/user/ComplaintContext"; // 👈 Import your provider

// Import Navbars
import Navbar from "./components/user/Navbar";

import UserComplaints from "./components/user/Complaints";
import SubmitComplaint from "./components/user/SubmitComplaint";
import Status from "./components/user/Status";
import UserHome from "./components/user/UserHome";
import About from "./pages/About";

import AdminHome from "./components/admin/AdminHome";
import Agents from "./components/admin/Agents";
import UserComplaintsAdmin from "./components/admin/UserComplaints";

import AgentHome from "./components/Agent/AgentHome";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";

// Layout wrappers for navbars
function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      {/* <AdminNavbar /> */}
      <Outlet />
    </>
  );
}

function AgentLayout() {
  return (
    <>
      {/* <AgentNavbar /> */}
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <ComplaintProvider> 
        <Router>
          <Routes>
            {/* User Routes */}
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserHome />} />
              <Route path="complaints" element={<UserComplaints />} />
              <Route path="status" element={<Status />} />
              <Route path="submit" element={<SubmitComplaint />} />
              <Route path="about" element={<About />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="agents" element={<Agents />} />
              <Route path="complaints" element={<UserComplaintsAdmin />} />
            </Route>

            {/* Agent Routes */}
            <Route path="/agent" element={<AgentLayout />}>
              <Route index element={<AgentHome />} />
            </Route>

            {/* Public/Common Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ComplaintProvider>
    </div>
  );
}
