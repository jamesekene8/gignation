import { Drawer } from "@mui/material";
import React from "react";

import JobItem from "./JobItem";
import JobList from "./JobList";

let anchor = "right";

const AppliedJobs = ({ application: { job, coverLetter } }) => {
  const [state, setState] = React.useState({
    [anchor]: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <JobItem
        job={job}
        coverLetter={coverLetter}
        onToggleDrawer={toggleDrawer(true)}
      />
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(false)}
      >
        <JobList
          job={job}
          coverLetter={coverLetter}
          onCloseDrawer={toggleDrawer(false)}
        />
      </Drawer>
    </>
  );
};

export default AppliedJobs;
