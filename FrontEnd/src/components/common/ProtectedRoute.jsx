import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRole }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) return <Navigate to="/login" />;

  if (userData.usertype !== allowedRole) {
    // Redirect to their actual home
    return <Navigate to={`/${userData.usertype}`} />;
  }

  return <Outlet />;
}
