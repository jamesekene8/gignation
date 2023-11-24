import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getResume, uploadResume } from "../../../app/store/resumeSlice";

const Resume = () => {
  const dispatch = useDispatch();
  const { resume } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getResume());
  }, [dispatch]);

  let initialValues = {
    file: null,
  };

  const YupValidation = Yup.object().shape({
    file: Yup.mixed()
      .required("PDF file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        return value && value.type === "application/pdf";
      })
      .test("fileSize", "File size is too large", (value) => {
        return value && value.size <= 1024 * 1024 * 5; // 5 MB limit
      }),
  });

  const handleSubmit = async (values, props) => {
    await dispatch(uploadResume(values));
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5" gutterBottom>
              Upload your recent resume or CV
            </Typography>
            <Typography variant="body1" gutterBottom>
              Upload your most up-to-date resume File types: PDF, DOCX, PPTX
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <div className="">
              {resume && (
                <Typography variant="body1" gutterBottom>
                  <a href={resume.url} className="text-[#143fcd]">
                    View your resume
                  </a>{" "}
                  or upload a new one below
                </Typography>
              )}
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={YupValidation}
              onSubmit={handleSubmit}
            >
              {(props) => {
                return (
                  <Form>
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
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ color: "white", backgroundColor: "black" }}
                    >
                      Upload
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Resume;
