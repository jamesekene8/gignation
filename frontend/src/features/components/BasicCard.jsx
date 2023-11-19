import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  TextField,
} from "@mui/material";

import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { applyForJob } from "../../app/store/jobSlice";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";

const direction = "bottom";

export default function BasicCard({
  title,
  description,
  salary,
  projectLength,
  location,
  dateCreated,
  // tags,
  typeOfWork,
  companyName,
  companySize,
  companyType,
  id,
  jobPeriod,
  applied,
}) {
  const [state, setState] = useState({
    bottom: false,
  });
  const navigate = useNavigate();

  const letterRef = useRef();
  const dispatch = useDispatch();

  const formHandler = useCallback(
    () => (e) => {
      e.preventDefault();
      const data = { letter: letterRef.current?.value };
      const applyForJobFunc = async (id, data) => {
        await dispatch(applyForJob({ id, data }));
      };
      applyForJobFunc(id, data);
      navigate("/jobs");
      toggleDrawer("bottom", false);
    },
    []
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="pl-[200px] pr-[200px] pt-[20px]"
      style={{ maxHeight: "600px" }}
    >
      <Box
        sx={{ width: anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className="flex justify-center items-center flex-col">
          <Typography variant="h4" gutterBottom>
            {companyName}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {companyType}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div>
              <Typography variant="h6" gutterBottom>
                Job Type
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobPeriod}
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
                Remote Policy
              </Typography>
              <Typography variant="body1" gutterBottom>
                {typeOfWork}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Typography variant="body1" gutterBottom>
                {location}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                Hires Remotely In
              </Typography>
              <Typography variant="body1" gutterBottom>
                Everywhere
              </Typography>
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                About the Job
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {description}
              </Typography>
            </div>
            <div></div>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ border: "1px solid black" }}>
              <div className="flex justify-center items-center pt-[20px] pb-[20px] bg-[#000000] text-white">
                Apply for Job
              </div>
              <div className="flex flex-col pl-[20px] pr-[20px] ">
                <Typography variant="h6" gutterBottom>
                  Is your profile up to date? click here to update
                </Typography>
                <form onSubmit={formHandler()}>
                  <Typography variant="h6" gutterBottom>
                    Cover Letter
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Write as note"
                    name="letter"
                    multiline
                    fullWidth
                    rows={7}
                    inputRef={letterRef}
                    required
                    disabled={applied}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      color: "white",
                      backgroundColor: "black",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                    fullWidth
                    disabled={applied}
                  >
                    Apply
                  </Button>

                  {applied && (
                    <p className="text-[#0000FF]">
                      You have already applied for this job{" "}
                    </p>
                  )}
                </form>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );

  return (
    <Card sx={{ minWidth: 275, marginBottom: "20px", backgroundColor: "#fff" }}>
      <CardActionArea>
        <CardContent onClick={toggleDrawer(direction, true)}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <div style={{ marginBottom: "30px" }}></div>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Salary: {salary} - Estimated time: {projectLength} - Location:{" "}
            {location} -{" "}
            {"Posted " + differenceInDays(new Date(), new Date(dateCreated)) ===
            0
              ? "recently"
              : "Posted " +
                differenceInDays(new Date(), new Date(dateCreated)) +
                " day(s) ago"}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 9 }} variant="body2">
            <div className="rounded-md bg-[#14a800] inline-block p-[3px] text-white">
              {typeOfWork}
            </div>
          </Typography>
          <Typography variant="body3">{description}</Typography>
          <div style={{ marginBottom: "20px" }}></div>
          <Typography sx={{ mb: 1.5, fontSize: 11 }} variant="body2">
            {/* {tags.map((val, k) => (
              <Tags key={k} name={val} />
            ))} */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={toggleDrawer(direction, true)}>
            Learn More
          </Button>
        </CardActions>
      </CardActionArea>
      <SwipeableDrawer
        anchor={direction}
        open={state[direction]}
        onClose={toggleDrawer(direction, false)}
        onOpen={toggleDrawer(direction, true)}
      >
        {list(direction)}
      </SwipeableDrawer>
    </Card>
  );
}
