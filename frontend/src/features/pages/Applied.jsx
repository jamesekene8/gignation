import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AppliedJobs from "../components/AppliedJobs";
import { useDispatch, useSelector } from "react-redux";
import { getUserJobApplications } from "../../app/store/jobSlice";
import { Link } from "react-router-dom";

const Applied = () => {
  const { userJobApplications } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUserApplications = async () => {
      await dispatch(getUserJobApplications());
    };
    getCurrentUserApplications();
  }, [dispatch]);

  console.log(userJobApplications);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Applications
      </Typography>
      <Divider sx={{ marginBottom: "20px" }} />
      {userJobApplications.length == 0 && (
        <Typography variant="overline" display="block" gutterBottom>
          You currently have no job applications.
          <Link to="/jobs">Click here</Link> to see all jobs
        </Typography>
      )}
      {userJobApplications.map((application, i) => {
        return <AppliedJobs key={i} application={application} />;
      })}
    </>
  );
};

export default Applied;
