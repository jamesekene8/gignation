import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminJobsPage from "./AdminJobsPage";

const AdminJobs = () => {
  const location = useLocation();

  return location.pathname === "/admin/jobs" ? <AdminJobsPage /> : <Outlet />;
};

export default AdminJobs;
