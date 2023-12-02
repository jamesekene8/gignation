import { ErrorMessage, Field, Form, Formik } from "formik";

import * as yup from "yup";
import {

  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../app/store/profileSlice";
import { toast } from "react-toastify";

const EditIdealNextOpportunity = ({ profile }) => {
  const dispatch = useDispatch();

  let initialValues = {
    desiredSalary: profile.desiredSalary,
    desiredLocation: profile.desiredLocation,
  };

  const YupValidation = yup.object().shape({
    desiredSalary: yup.string().required("Desired Salary is Required"),
    desiredLocation: yup.string().required("Desired Location is Required"),
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
                <Grid item xs={8}>
                  <Typography variant="h6" gutterBottom>
                    Select your Desired Location
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label-role">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label-role"
                      id="demo-simple-select-role"
                      value={props.values.desiredLocation}
                      label="Desired Location"
                      onChange={props.handleChange}
                      name="desiredLocation"
                      error={
                        props.errors.desiredLocation &&
                        props.touched.desiredLocation
                      }
                    >
                      <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" gutterBottom>
                    Enter your desired salary
                  </Typography>
                  <Field
                    as={TextField}
                    label="Salary"
                    type="text"
                    name="desiredSalary"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="desiredSalary" />}
                    error={
                      props.errors.desiredSalary && props.touched.desiredSalary
                    }
                  />
                </Grid>
              </Grid>
              <Grid container columns={16} spacing={2}>
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

export default EditIdealNextOpportunity;
