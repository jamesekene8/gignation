import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getSearchedJobs } from "../../app/store/jobSlice";
import JobSkeleton from "../components/skeleton/JobSkeleton";
import BasicCard from "../components/BasicCard";
import { Typography } from "@mui/material";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { loading, searchedJobs } = useSelector((state) => state.job);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getSearchedJobs(searchParams.get("term")));
  }, [dispatch, searchParams]);

  return (
    <>
      {loading ? (
        <>
          <JobSkeleton />
          <JobSkeleton />
          <JobSkeleton />
        </>
      ) : (
        <>
          {searchedJobs?.length == 0 && (
            <p>You have no jobs with the search criteria</p>
          )}
          <Typography variant="h6" gutterBottom>
            search term: {searchParams.get("term")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#14a800" }}
            gutterBottom
          >
            {searchedJobs.length} results found
          </Typography>
          {searchedJobs
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
                  profile.desiredRole &&
                  profile.desiredLocation &&
                  profile.yearsOfExperience &&
                  profile.desiredSalary
                }
              />
            ))}
        </>
      )}
    </>
  );
};

export default Search;
