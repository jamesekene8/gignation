import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (location.pathname === "/profile") {
    navigate("/profile/overview");
  }

  const tabs = [
    { label: "Overview", to: "overview" },
    { label: "Profile", to: "edit" },
    { label: "Resume", to: "resume" },
  ];

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Edit your gignation profile
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.to}
              label={tab.label}
              value={tab.to}
              component={Link}
              to={tab.to}
            />
          ))}
        </Tabs>
      </Box>

      <Outlet />
    </div>
  );
};

export default Profile;
