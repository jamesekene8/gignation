import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { addEducation } from "../../../app/store/educationSlice";

const AddUserEducation = ({ handleFormClose }) => {
  const dispatch = useDispatch();

  let initialValues = {
    name: "",
    degree: "",
    GPA: "",
  };

  const YupValidation = yup.object().shape({
    name: yup.string().required("Please, enter the name of institution"),

    degree: yup.string().required("Please enter your degree"),

    GPA: yup.string().required("Please entyer your gpa"),
  });

  const handleSubmit = async (values, props) => {
    await dispatch(addEducation(values));
    handleFormClose();
  };

  return (
    <Card sx={{ backgroundColor: "#E6E6E6", marginBottom: "20px" }}>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={YupValidation}
          onSubmit={handleSubmit}
        >
          {(props) => {
            return (
              <Form>
                <Grid container columns={16} spacing={1}>
                  <Typography variant="h6" gutterBottom>
                    Institution
                  </Typography>{" "}
                  <Field
                    as={TextField}
                    label="name"
                    type="text"
                    name="name"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="name" />}
                    error={props.errors.name && props.touched.name}
                    sx={{ backgroundColor: "white" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Degree
                  </Typography>{" "}
                  <Field
                    as={TextField}
                    label="degree"
                    type="text"
                    name="degree"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="degree" />}
                    error={props.errors.degree && props.touched.degree}
                    sx={{ backgroundColor: "white" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    GPA
                  </Typography>
                  <Field
                    as={TextField}
                    label="GPA"
                    type="text"
                    name="GPA"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="GPA" />}
                    error={props.errors.GPA && props.touched.GPA}
                    sx={{ backgroundColor: "white" }}
                  />
                  <div className="flex">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        color: "white",
                        backgroundColor: "black",
                        marginRight: "15px",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      sx={{
                        color: "black",
                      }}
                      variant="text"
                      onClick={() => handleFormClose()}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default AddUserEducation;
