import React from "react";
import DnsIcon from "@mui/icons-material/Dns";
import { Typography } from "@mui/material";

const About = ({ bio }) => {
  return (
    <div className="flex">
      <DnsIcon />
      <Typography variant="body1" sx={{ paddingLeft: "10px" }} gutterBottom>
        {bio}
      </Typography>
    </div>
  );
};

export default About;
