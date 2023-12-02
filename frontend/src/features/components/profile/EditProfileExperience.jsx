import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExperiences,
  removeExperience,
} from "../../../app/store/experienceSlice";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserExperience from "./AddUserExperience";

const EditProfileExperience = () => {
  const [experienceMode, setExperienceMode] = useState(false);
  const dispatch = useDispatch();
  const { experiences } = useSelector((state) => state.experience);

  useEffect(() => {
    const getUserExperiences = async () => {
      await dispatch(getExperiences());
    };

    getUserExperiences();
  }, [dispatch]);

  const handleFormClose = () => {
    setExperienceMode(!experienceMode);
  };

  const handleDeleteExperience = async (id) => {
    await dispatch(removeExperience(id));
  };

  return (
    <>
      {experiences.map((exp) => (
        <Card
          key={exp.id}
          sx={{ backgroundColor: "#E6E6E6", marginBottom: "20px" }}
        >
          <CardContent>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={2}>
                <Avatar variant="square">E</Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ paddingBottom: "0px" }}
                >
                  {exp.jobRole}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {exp.companyName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  2020
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {exp.description}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleDeleteExperience(exp.id)}>
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      <Button onClick={() => setExperienceMode(!experienceMode)}>
        + Add Work experience
      </Button>
      {experienceMode && (
        <AddUserExperience handleFormClose={handleFormClose} />
      )}
    </>
  );
};

export default EditProfileExperience;
