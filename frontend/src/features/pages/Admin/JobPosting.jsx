import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicantCard from "../../components/Admin/ApplicantCard";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJob,
  getJob,
  getJobApplications,
} from "../../../app/store/jobSlice";
import { Space, Spin } from "antd";

const JobPosting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job, jobApplicants, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob(id));
    dispatch(getJobApplications(id));
  }, []);

  const handleJobDelete = (id) => {
    dispatch(deleteJob(id));
    navigate("/admin/jobs");
  };

  const handleClick = () => {};

  return (
    <div>
      <div role="presentation" onClick={handleClick} className="mb-[20px]">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/admin/jobs">
            Posts
          </Link>

          <Typography color="text.primary">{job?.title}</Typography>
        </Breadcrumbs>
      </div>
      <Card>
        {loading ? (
          <div className="flex justify-center items-center">
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        ) : (
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {job?.title}
              {job?.isActive ? (
                <Chip
                  label="Active"
                  sx={{ backgroundColor: "#65a769", color: "white" }}
                />
              ) : (
                <Chip
                  label="Closed"
                  sx={{ backgroundColor: "#ADD8E6", color: "white" }}
                />
              )}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Job Type: {job?.jobType}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Job Period: {job?.jobPeriod}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Company Name: {job?.companyName}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Company Size: {job?.companySize}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Company Type: {job?.companyType}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              Location: {job?.location}
            </Typography>

            <Typography variant="h6" gutterBottom>
              About Job:
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
            <Typography variant="body1" gutterBottom>
              {job?.description}
            </Typography>
            <Card>
              <CardContent>
                {jobApplicants?.length == 0 && (
                  <Typography
                    variant="body1"
                    sx={{ color: "blue" }}
                    gutterBottom
                  >
                    There are no applications for this job at the moment!
                  </Typography>
                )}
                {jobApplicants?.map((applicant) => {
                  return (
                    <ApplicantCard key={applicant.id} applicant={applicant} />
                  );
                })}
              </CardContent>
            </Card>
            <div className="flex mt-[20px]">
              {job?.isActive && (
                <Button
                  variant="outlined"
                  sx={{ marginRight: "10px" }}
                  onClick={() => navigate(`edit`)}
                >
                  Edit Job
                </Button>
              )}
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleJobDelete(job?.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default JobPosting;
