import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const JobItem = ({ job, coverLetter, onToggleDrawer }) => {
  return (
    <Card fullwidth sx={{ marginTop: "15px" }} onClick={onToggleDrawer}>
      <CardActionArea>
        <CardContent>
          <div className="flex">
            <div className="mr-[10px]">
              <Avatar variant="square">N</Avatar>
            </div>
            <div className="flex justify-between w-[100%]">
              <div>
                <Typography variant="h5" gutterBottom>
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
              </div>
              <div>
                <ArrowForwardIosIcon />
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobItem;
