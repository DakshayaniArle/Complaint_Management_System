import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    return <Navigate to={`/${userData.usertype}`} />;
  }

  return <Outlet />;
}
