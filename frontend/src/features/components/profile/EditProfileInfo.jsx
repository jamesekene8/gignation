import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { updateProfile } from "../../../app/store/profileSlice";
import { toast } from "react-toastify";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
const FILE_SIZE = 524288;

const EditProfileInfo = ({ profile }) => {
  const dispatch = useDispatch();

  let initialValues = {
    firstName: profile.firstName,
    surname: profile.surname,
    desiredRole: profile.desiredRole,
    yearsOfExperience: profile.yearsOfExperience,
    bio: profile.bio,
    country: profile.country,
    // file: "",
  };

  const YupValidation = yup.object().shape({
    firstName: yup
      .string()
      .min(3, "Too Short !")
      .max(30, "Too Long !")
      .required("First Name is Required"),

    surname: yup
      .string()
      .min(3, "Too Short !")
      .max(30, "Too Long !")
      .required("Surname is Required"),

    country: yup
      .string()
      .min(3, "Too Short !")
      .max(30, "Too Long !")
      .required("Location is Required"),

    desiredRole: yup.string().required("Desired Role is Required"),

    yearsOfExperience: yup.number().required("Years of experience is required"),

    bio: yup
      .string()
      .min(3, "Too Short !")
      .max(800, "Too Long !")
      .required("bio is required"),

    file: yup
      .mixed()
      .test(
        "fileSize",
        "File more than 0.5 MB not Allowed",
        (value) => value && value.size <= 524288
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleSubmit = async (values, props) => {
    try {
      await dispatch(updateProfile(values));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
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
              <Grid container spacing={2} columns={16}>
                <Grid item xs={6}>
                  <Avatar
                    alt={profile?.firstName + " " + profile?.lastName}
                    src={profile?.profilePhoto}
                    sx={{ width: 100, height: 100 }}
                  />
                  <TextField
                    name="file"
                    type="file"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    onChange={(event) =>
                      props.setFieldValue("file", event.target.files[0])
                    }
                    onBlur={props.handleBlur}
                    helperText={<ErrorMessage name="file" />}
                    error={props.errors.file && props.touched.file}
                  />
                </Grid>
                <Grid item xs={16}></Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>
                Your Name*
              </Typography>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <Field
                    as={TextField}
                    label="First Name"
                    type="text"
                    name="firstName"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="firstName" />}
                    error={props.errors.firstName && props.touched.firstName}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Field
                    as={TextField}
                    label="Surname"
                    type="text"
                    name="surname"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="surname" />}
                    error={props.errors.firstName && props.touched.firstName}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} columns={16}>
                <Grid item xs={16}>
                  <Typography variant="h6" gutterBottom>
                    Where are you based?
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.country}
                      label="Country"
                      onChange={props.handleChange}
                      name="country"
                      error={props.errors.country && props.touched.country}
                    >
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container columns={16} spacing={2}>
                <Grid item xs={11}>
                  <Typography variant="h6" gutterBottom>
                    Select Primary Role
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Select Primary Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.desiredRole}
                      label="Desired Role"
                      onChange={props.handleChange}
                      name="desiredRole"
                      error={
                        props.errors.desiredRole && props.touched.desiredRole
                      }
                    >
                      <MenuItem value="Software Engineer">
                        Software Engineer
                      </MenuItem>
                      <MenuItem value="Frontend Engineer">
                        Frontend Engineer
                      </MenuItem>
                      <MenuItem value="Backend Engineer">
                        Backend Engineer
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="h6" gutterBottom>
                    Years of experience
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Years of experience
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={props.values.yearsOfExperience}
                      label="Years of experience"
                      onChange={props.handleChange}
                      name="yearsOfExperience"
                      error={
                        props.errors.yearsOfExperience &&
                        props.touched.yearsOfExperience
                      }
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container columns={16} spacing={2}>
                <Grid item xs={16}>
                  <Typography variant="h6" gutterBottom>
                    bio
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="bio"
                    name="bio"
                    multiline
                    fullWidth
                    rows={10}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    defaultValue={props.values.bio}
                    error={props.errors.bio && props.touched.bio}
                    helperText={<ErrorMessage name="bio" />}
                  />
                </Grid>
              </Grid>

              <Grid container columns={16} spacing={2}>
                <Grid item xs={16}></Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ color: "white", backgroundColor: "black" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfileInfo;
