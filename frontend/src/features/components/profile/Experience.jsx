import { Avatar, Typography } from "@mui/material";
import React from "react";

const Experience = ({ exp }) => {
  return (
    <div className="flex mb-[10px]">
      <div className="pr-[10px]">
        <Avatar variant="square">N</Avatar>
      </div>
      <div>
        <Typography variant="h6" gutterBottom>
          {exp.jobRole}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {exp.companyName}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Apr 2022 - Present
        </Typography>
        <Typography variant="body1" gutterBottom>
          {exp.description}
        </Typography>
      </div>
    </div>
  );
};

export default Experience;
