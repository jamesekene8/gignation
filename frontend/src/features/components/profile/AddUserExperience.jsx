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
import { addExperience } from "../../../app/store/experienceSlice";

const AddUserExperience = ({ handleFormClose }) => {
  const dispatch = useDispatch();

  let initialValues = {
    jobRole: "",
    companyName: "",
    description: "",
  };

  const YupValidation = yup.object().shape({
    jobRole: yup.string().required("Please, enter the job role"),

    companyName: yup.string().required("Please enter the name of company"),

    description: yup
      .string()
      .min(3, "Too Short !")
      .max(800, "Too Long !")
      .required("description is required"),
  });

  const handleSubmit = async (values, props) => {
    await dispatch(addExperience(values));
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
                    Job Role
                  </Typography>{" "}
                  <Field
                    as={TextField}
                    label="Job Role"
                    type="text"
                    name="jobRole"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    helperText={<ErrorMessage name="jobRole" />}
                    error={props.errors.jobRole && props.touched.jobRole}
                    sx={{ backgroundColor: "white" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Company
                  </Typography>
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
                    sx={{ backgroundColor: "white" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
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

export default AddUserExperience;
