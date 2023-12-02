import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { registerUser } from "../../../app/store/accountSlice";

const RegisterForm = () => {
  const [registerBtn, setRegisterBtn] = useState(false);
  const dispatch = useDispatch();
  const { registerError } = useSelector((state) => state.account);

  console.log(registerError);

  const initialValues = {
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    email: yup
      .string()
      .email("Enter a Vaid Email")
      .required("Email is Required"),

    password: yup
      .string()
      .required("Enter Your Password")
      .min(8, "Password Should be minimum 8 character")
      .max(50, "Too long"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not matched")
      .required("Confirm Password is Required"),
  });

  const handleSubmit = async (values, props) => {
    setRegisterBtn(() => !registerBtn);
    await dispatch(registerUser(values));
  };

  return (
    <Grid container>
      <Grid item sm={3} xs={false}></Grid>
      <Grid item sm={6} xs={12}>
        <Paper>
          <Box m={5} p={3}>
            <Typography variant="h5">Register</Typography>
            {registerError && (
              <Alert
                sx={{ marginTop: "5px", marginBottom: "10px" }}
                severity="error"
              >
                {registerError}
              </Alert>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={YupValidation}
              onSubmit={handleSubmit}
            >
              {(props) => {
                return (
                  <Form>
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
                    <Field
                      as={TextField}
                      label="Surname"
                      type="text"
                      name="surname"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="surname" />}
                      error={props.errors.surname && props.touched.surname}
                    />
                    <Field
                      as={TextField}
                      label="Email"
                      type="Email"
                      name="email"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="email" />}
                      error={props.errors.email && props.touched.email}
                    />

                    <Field
                      as={TextField}
                      label="Password"
                      name="password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="password" />}
                      error={props.errors.password && props.touched.password}
                    />

                    <Field
                      as={TextField}
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      helperText={<ErrorMessage name="confirmPassword" />}
                      error={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                      }
                    />

                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                      disabled={registerBtn && !registerError}
                      sx={{ padding: "10px" }}
                    >
                      {registerBtn && !registerError ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={3} xs={false}></Grid>
    </Grid>
  );
};

export default RegisterForm;
