import { Box, Tab } from "@mui/material";
import { Space, Spin } from "antd";
import React, { useEffect } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import JobPostingCard from "./JobPostingCard";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../app/store/jobSlice";

const JobPosting = () => {
  const [value, setValue] = React.useState("1");
  const { jobs, loading } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return loading ? (
    <div className="flex justify-center items-center">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  ) : (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Active" value="1" />
            <Tab label="Closed" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {jobs
            .filter((job) => job.isActive == true)
            .map((job) => {
              return <JobPostingCard key={job.id} job={job} />;
            })}
        </TabPanel>
        <TabPanel value="2">
          {jobs
            .filter((job) => job.isActive == false)
            .map((job) => {
              return <JobPostingCard key={job.id} job={job} />;
            })}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default JobPosting;
