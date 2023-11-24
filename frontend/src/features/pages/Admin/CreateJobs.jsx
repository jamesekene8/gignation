import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { createJob, getJobs } from "../../../app/store/jobSlice";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../components/skeleton/SimpleBackDrop";

const CreateJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.job);

  let initialValues = {
    title: "",
    description: "",
    jobType: "",
    jobPeriod: "",
    companyName: "",
    companySize: "",
    companyType: "",
    salary: "",
    location: "",
  };

  const YupValidation = yup.object().shape({
    title: yup
      .string()
      .min(3, "Too Short !")
      .max(100, "Too Long !")
      .required("title is Required"),

    description: yup
      .string()
      .min(1000, "Too Short !")
      .max(10000, "Too Long !")
      .required("Description is Required"),

    jobType: yup.string().required("Job Type is Required"),

    jobPeriod: yup.string().required("Job Period is required"),

    companyName: yup
      .string()
      .min(3, "Too Short !")
      .max(100, "Too Long !")
      .required("Company Name is required"),

    companySize: yup
      .string()
      .min(3, "Too Short !")
      .max(100, "Too Long !")
      .required("Company size is required"),

    companyType: yup
      .string()
      .min(3, "Too Short !")
      .max(100, "Too Long !")
      .required("Company type is required"),

    salary: yup
      .string()
      .min(3, "Too Short !")
      .max(100, "Too Long !")
      .required("Salary is required"),

    location: yup
      .string()
      .min(3, "Too Short !")
      .max(30, "Too Long !")
      .required("Location is Required"),
  });

  const handleSubmit = (values, props) => {
    dispatch(createJob(values)).then(() => navigate("/admin/jobs"));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create a Job Posting
      </Typography>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Field
                    as={TextField}
                    label="Title"
                    type="text"
                    name="title"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="title" />}
                    error={props.errors.title && props.touched.title}
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    name="description"
                    multiline
                    fullWidth
                    rows={10}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    defaultValue={props.values.description}
                    error={
                      props.errors.description && props.touched.description
                    }
                    helperText={<ErrorMessage name="description" />}
                  />
                </Grid>
                <Grid item xs={4.5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Job Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.jobType}
                      label="Job Type"
                      onChange={props.handleChange}
                      name="jobType"
                      error={props.errors.jobType && props.touched.jobType}
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Temporary">Temporary</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4.5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Job Period
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.jobPeriod}
                      label="Job Period"
                      onChange={props.handleChange}
                      name="jobPeriod"
                      error={props.errors.jobPeriod && props.touched.jobPeriod}
                    >
                      <MenuItem value="1 month">1 month</MenuItem>
                      <MenuItem value="1 - 3months">1 - 3months</MenuItem>
                      <MenuItem value="3 - 6months">3 - 6months</MenuItem>
                      <MenuItem value="6months and above">
                        6months and above
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Company Name"
                    type="text"
                    name="companyName"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="companyName" />}
                    error={
                      props.errors.companyName && props.touched.companyName
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    as={TextField}
                    label="Company Type"
                    type="text"
                    name="companyType"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="companyType" />}
                    error={
                      props.errors.companyType && props.touched.companyType
                    }
                  />
                </Grid>
                <Grid item xs={4.5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Company Size
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.companySize}
                      label="Company Size"
                      onChange={props.handleChange}
                      name="companySize"
                      error={
                        props.errors.companySize && props.touched.companySize
                      }
                    >
                      <MenuItem value="1 - 10 employees">
                        1 - 10 employees
                      </MenuItem>
                      <MenuItem value="10 - 50 employees">
                        10 - 50 employees
                      </MenuItem>
                      <MenuItem value="50 - 100 employees">
                        10 - 100 employees
                      </MenuItem>
                      <MenuItem value="100 and above employees">
                        100 and above employees
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4.5}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.location}
                      label="Location"
                      onChange={props.handleChange}
                      name="location"
                      error={props.errors.location && props.touched.location}
                    >
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    as={TextField}
                    label="salary"
                    type="text"
                    name="salary"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="salary" />}
                    error={props.errors.salary && props.touched.salary}
                  />
                </Grid>

                <Grid item xs={9}>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{ color: "white", backgroundColor: "black" }}
                    loading={loading}
                    loadingPosition="end"
                  >
                    Post Job
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      {/* <SimpleBackdrop loading={loading} /> */}
    </>
  );
};

export default CreateJobs;
