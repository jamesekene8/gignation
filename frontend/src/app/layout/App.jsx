import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "../../features/pages/Login";
import Job from "../../features/pages/Job";
import Applied from "../../features/pages/Applied";
import Profile from "../../features/pages/profile/Profile";
import ProfileOverview from "../../features/pages/profile/Overview";
import Edit from "../../features/pages/profile/Edit";
import NotFound from "../../features/pages/NotFound";
import ServerError from "../../features/pages/ServerError";
import RequireAuth from "../routes/RequireAuth";
import HomePage from "../../features/pages/HomePage";
import Unauthorized from "../../features/pages/Unauthorized";
import Admin from "../../features/pages/Admin/Admin";
import AdminJobs from "../../features/pages/Admin/AdminJobs";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../store/accountSlice";
import CreateJobs from "../../features/pages/Admin/CreateJobs";
import JobPosting from "../../features/pages/Admin/JobPosting";
import EditJobPosting from "../../features/pages/Admin/EditJobPosting";

const ROLES = {
  User: "Freelancer",
  Admin: "Admin",
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="jobs" element={<Job />}>
            <Route path="applied" element={<Applied />} />
          </Route>

          <Route path="profile" element={<Profile />}>
            <Route path="overview" element={<ProfileOverview />} />
            <Route path="edit" element={<Edit />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />}>
            <Route path="jobs" element={<AdminJobs />}>
              <Route path=":id" element={<JobPosting />} />
              <Route path=":id/edit" element={<EditJobPosting />} />
              <Route path="create" element={<CreateJobs />} />
            </Route>
          </Route>
        </Route>

        <Route path="not-found" element={<NotFound />} />
        <Route path="server-error" element={<ServerError />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
