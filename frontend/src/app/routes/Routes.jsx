import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Job from "../../features/pages/Job";
import RequireAuth from "./RequireAuth";
import NotFound from "../../features/pages/NotFound";
import ServerError from "../../features/pages/ServerError";
import Profile from "../../features/pages/profile/Profile";
import ProfileOverview from "../../features/pages/profile/Overview";
import Edit from "../../features/pages/profile/Edit";
import Applied from "../../features/pages/Applied";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "jobs",
            element: <Job />,
            children: [{ path: "applied", element: <Applied /> }],
          },

          {
            path: "profile",
            element: <Profile />,
            children: [
              { path: "overview", element: <ProfileOverview /> },
              { path: "edit", element: <Edit /> },
            ],
          },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
