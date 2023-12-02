import { Alert, CircularProgress } from "@mui/material";
import BasicCard from "../components/BasicCard";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobs, updatePagingParams } from "../../app/store/jobSlice";
import JobSkeleton from "../components/skeleton/JobSkeleton";
import { getProfile } from "../../app/store/profileSlice";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { PagingParams } from "../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";

const JobPage = () => {
  const dispatch = useDispatch();

  const { jobs, loading, pagination } = useSelector((state) => state.job);
  const { profile } = useSelector((state) => state.profile);
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    dispatch(updatePagingParams(new PagingParams(pagination?.currentPage + 1)));
    dispatch(getJobs());
    setLoadingNext(false);
  }

  useEffect(() => {
    const asyncAction = async () => {
      await dispatch(getProfile());
      await dispatch(getJobs());
    };
    asyncAction();
  }, [dispatch]);

  console.log(jobs);

  return (
    <div>
      {!loading &&
        !profile?.bio &&
        !profile?.desiredRole &&
        !profile?.desiredLocation &&
        !profile?.yearsOfExperience &&
        !profile?.desiredSalary && (
          <Alert severity="error">
            Please,{" "}
            <Link to="/profile/edit" style={{ color: "blue" }}>
              click here
            </Link>{" "}
            to complete your profile. Fill in your details such as bio, desired
            slary, location and years of experience to be able to apply for jobs
          </Alert>
        )}
      <Typography variant="h2" gutterBottom>
        Jobs you may like
      </Typography>
      <Search />
      <Typography variant="h6" gutterBottom>
        Saved searches: content writing
      </Typography>
      <div style={{ marginBottom: "20px" }}></div>
      <Typography variant="subtitle1" sx={{ color: "#14a800" }} gutterBottom>
        To get the most out of your application, maker sure you pload your CV.
      </Typography>

      {loading ? (
        <>
          <JobSkeleton />
          <JobSkeleton />
          <JobSkeleton />
        </>
      ) : (
        <>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            {jobs
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
                  profileComplete={
                    profile?.bio &&
                    profile?.desiredRole &&
                    profile?.desiredLocation &&
                    profile?.yearsOfExperience &&
                    profile?.desiredSalary
                  }
                />
              ))}
          </InfiniteScroll>
          <div className="flex justify-center items-center mt-[10px]">
            {loadingNext && <CircularProgress />}
          </div>
        </>
      )}
    </div>
  );
};

export default JobPage;
