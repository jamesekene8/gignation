import { TextField } from "@mui/material";
import { Form, Formik } from "formik";

import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Search = () => {
  const navigate = useNavigate();

  const initialValues = {
    search: "",
  };

  const YupValidation = yup.object().shape({
    email: yup.string(),
  });

  const handleSubmit = async (values, props) => {
    navigate("/jobs/search?term=" + values.search);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={YupValidation}
      onSubmit={handleSubmit}
    >
      {(props) => {
        return (
          <Form>
            <TextField
              fullWidth
              label="Search for job"
              id="fullWidth"
              name="search"
              rows={10}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
              defaultValue={props.values.search}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Search;
