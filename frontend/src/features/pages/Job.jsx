import { useDispatch, useSelector } from "react-redux";

import { Outlet, useLocation } from "react-router-dom";
import JobPage from "./JobPage";

const Job = () => {
  let location = useLocation();

  const { jobs, loading } = useSelector((state) => state.job);

  if (location.pathname === "/jobs") {
    return <JobPage />;
  } else {
    return <Outlet />;
  }
};

export default Job;
