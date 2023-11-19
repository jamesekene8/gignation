import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { retrieveJobApplication } from "../../app/store/jobSlice";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "./ChatBox";

const JobList = ({ job, coverLetter, onCloseDrawer }) => {
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRetrieveJobApplication = (id) => {
    dispatch(retrieveJobApplication(id));
    onCloseDrawer(true);
  };

  return (
    <Box
      sx={{ width: 1200 }}
      role="presentation"
      //  onClick={onCloseDrawer}
      //  onKeyDown={onCloseDrawer}
    >
      <div className="flex p-[20px]">
        <div className="mr-[10px]">
          <Avatar variant="square">N</Avatar>
        </div>
        <div className="flex justify-between w-[100%]">
          <div>
            <Typography variant="h4" gutterBottom>
              {job.companyName}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              {job.title}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              Pending
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              OCT 12th, 2023
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => handleRetrieveJobApplication(job.id)}
            >
              Retrieve Application
            </Button>
          </div>
          <div>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
      <Divider />
      <div className="p-[10px]">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={<SaveAltIcon />} value="1" />
              <Tab label={<WorkIcon />} value="2" />
              <Tab label={<ChatIcon />} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">{coverLetter}</TabPanel>
          <TabPanel value="2">
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  About Job:
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {job.description}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <div
                  className="mt-[20px] w-[100%] p-[10px] flex flex-col"
                  style={{ border: "1px solid #dcdcdc" }}
                >
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Company
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {job.companyName}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Remote - {job.location}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Job Type
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {job?.jobType}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Visa Sponsorship
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Not Avalaible
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Hires Remotely
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {job?.remote}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Remote work policy
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Onsite or remote
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <ChatBox job={job} />
          </TabPanel>
        </TabContext>
      </div>
    </Box>
  );
};

export default JobList;
