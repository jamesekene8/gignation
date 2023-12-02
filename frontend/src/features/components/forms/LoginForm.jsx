import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../app/store/accountSlice";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const LoginForm = () => {
  const [loginBtn, setLoginBtn] = useState(false);
  const { loginError } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const YupValidation = yup.object().shape({
    email: yup
      .string()
      .email("Enter a Vaid Email")
      .required("Email is Required"),

    password: yup
      .string()
      .required("Enter Your Password")
      .min(8, "Password Should be minimum 8 character")
      .max(50, "Too long"),
  });

  const handleSubmit = async (values, props) => {
    setLoginBtn(() => !loginBtn);
    await dispatch(loginUser(values));
  };

  return (
    <Grid container>
      <Grid item sm={3} xs={false}></Grid>
      <Grid item sm={6} xs={12}>
        <Paper>
          <Box m={5} p={3}>
            <Typography variant="h5">Login</Typography>
            {loginError && (
              <Alert
                sx={{ marginTop: "5px", marginBottom: "10px" }}
                severity="error"
              >
                {loginError}
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

                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                      disabled={loginBtn && !loginError}
                      sx={{ padding: "10px", marginTop: "20px" }}
                    >
                      {loginBtn && !loginError ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        "Login"
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

export default LoginForm;
