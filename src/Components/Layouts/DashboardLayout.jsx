import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const DashboardLayout = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) return <Navigate to="/login" />;

  // Only admin can access
  if (user.role !== 1) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-[19%] w-full bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};



export default DashboardLayout;
