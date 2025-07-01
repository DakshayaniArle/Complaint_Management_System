import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ComplaintProvider } from "./components/user/ComplaintContext"; 

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

import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";

// Layout wrappers
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
      <Outlet />
    </>
  );
}

function AgentLayout() {
  return (
    <>
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
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* USER PROTECTED ROUTES */}
            <Route element={<ProtectedRoute allowedRole="user" />}>
              <Route path="/user" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="complaints" element={<UserComplaints />} />
                <Route path="status" element={<Status />} />
                <Route path="submit" element={<SubmitComplaint />} />
                <Route path="about" element={<About />} />
              </Route>
            </Route>

            {/* ADMIN PROTECTED ROUTES */}
            <Route element={<ProtectedRoute allowedRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="agents" element={<Agents />} />
                <Route path="complaints" element={<UserComplaintsAdmin />} />
              </Route>
            </Route>

            {/* AGENT PROTECTED ROUTES */}
            <Route element={<ProtectedRoute allowedRole="agent" />}>
              <Route path="/agent" element={<AgentLayout />}>
                <Route index element={<AgentHome />} />
              </Route>
            </Route>

            {/* CATCH-ALL */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ComplaintProvider>
    </div>
  );
}
