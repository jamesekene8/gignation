import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUserEducation from "./AddEducation";
import {
  getEducations,
  removeEducation,
} from "../../../app/store/educationSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const EditProfileEducation = () => {
  const [educationMode, setEducationMode] = useState(false);
  const { educations } = useSelector((state) => state.education);
  const dispatch = useDispatch();

  const handleFormClose = () => {
    setEducationMode(!educationMode);
  };

  const handleEducationDelete = async (id) => {
    await dispatch(removeEducation(id));
  };

  useEffect(() => {
    const getUserEducation = async () => {
      await dispatch(getEducations());
    };

    getUserEducation();
  }, [dispatch]);

  return (
    <>
      {educations.map((edu) => (
        <Card
          key={edu.id}
          sx={{ backgroundColor: "#E6E6E6", marginBottom: "20px" }}
        >
          <CardContent>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={2}>
                <Avatar variant="square">N</Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ paddingBottom: "0px" }}
                >
                  {edu.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {edu.degree}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {edu.gpa}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  2020
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleEducationDelete(edu.id)}>
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Button onClick={() => setEducationMode(!educationMode)}>
        + Add Education
      </Button>
      {educationMode && <AddUserEducation handleFormClose={handleFormClose} />}
    </>
  );
};

export default EditProfileEducation;
