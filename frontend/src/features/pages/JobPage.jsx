import { Alert, TextField } from "@mui/material";
import BasicCard from "../components/BasicCard";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJobs } from "../../app/store/jobSlice";
import JobSkeleton from "../components/skeleton/JobSkeleton";
import { getProfile } from "../../app/store/profileSlice";
import { Link } from "react-router-dom";

const JobPage = () => {
  const dispatch = useDispatch();

  const { jobs, loading } = useSelector((state) => state.job);
  const { profile } = useSelector((state) => state.profile);

  console.log(jobs);

  useEffect(() => {
    const asyncAction = async () => {
      await dispatch(getProfile());
      await dispatch(getJobs());
    };
    asyncAction();
  }, [dispatch]);

  return (
    <div>
      {!loading && !profile?.bio && (
        <Alert severity="error">
          Please,{" "}
          <Link to="/profile/edit" style={{ color: "blue" }}>
            click here
          </Link>{" "}
          to complete your profile
        </Alert>
      )}
      <Typography variant="h2" gutterBottom>
        Jobs you may like
      </Typography>
      <TextField fullWidth label="Search for job" id="fullWidth" />
      <Typography variant="h6" gutterBottom>
        Saved searches: content writing
      </Typography>
      <div style={{ marginBottom: "20px" }}></div>
      <Typography variant="subtitle1" sx={{ color: "#14a800" }} gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>

      {loading ? (
        <>
          <JobSkeleton />
          <JobSkeleton />
          <JobSkeleton />
        </>
      ) : (
        jobs
          .filter((job) => job.isActive == true)
          .map((job) => (
            <BasicCard
              key={job.id}
              title={job.title}
              description={job.description}
              salary={job.salary}
              projectLength={job.jobPeriod}
              location={job.location}
              dateCreated={job.createdAt}
              // tags={job.tags}
              typeOfWork={job.jobType}
              companyName={job.companyName}
              companySize={job.companySize}
              companyType={job.companyType}
              id={job.id}
              jobPeriod={job.jobPeriod}
              applied={job.applied}
            />
          ))
      )}
    </div>
  );
};

export default JobPage;
