import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../app/store/profileSlice";
import { toast } from "react-toastify";

const EditProfileSocials = ({ profile }) => {
  const dispatch = useDispatch();

  let initialValues = {
    linkdln: profile.linkdln,
    github: profile.github,
    twitter: profile.twitter,
  };

  const YupValidation = yup.object().shape({
    linkdln: yup.string().required("Please enter your linkdln url"),

    github: yup.string().required("Please enter your github url"),

    twitter: yup.string().required("Please enter your github url"),
  });

  const handleSubmit = async (values, props) => {
    try {
      await dispatch(updateProfile(values));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("A problem occured");
    }
  };

  return (
    <div className="mb-[20px]">
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Form>
              <Grid container columns={16}>
                <Typography variant="h6" gutterBottom>
                  <LinkedInIcon /> Linkdln
                </Typography>
                <Field
                  as={TextField}
                  label="Linkdln"
                  type="text"
                  name="linkdln"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  helperText={<ErrorMessage name="linkdln" />}
                  error={props.errors.linkdln && props.touched.linkdln}
                />

                <Typography variant="h6" gutterBottom>
                  <TwitterIcon /> Twitter
                </Typography>
                <Field
                  as={TextField}
                  label="Twitter"
                  type="text"
                  name="twitter"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  helperText={<ErrorMessage name="twitter" />}
                  error={props.errors.twitter && props.touched.twitter}
                />

                <Typography variant="h6" gutterBottom>
                  <GitHubIcon /> Github
                </Typography>
                <Field
                  as={TextField}
                  label="Github"
                  type="text"
                  name="github"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  helperText={<ErrorMessage name="github" />}
                  error={props.errors.github && props.touched.github}
                />

                <Button
                  variant="contained"
                  type="submit"
                  sx={{ color: "white", backgroundColor: "black" }}
                >
                  Save
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfileSocials;
