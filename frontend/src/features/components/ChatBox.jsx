import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  clearComments,
  createHubConnection,
} from "../../app/store/commentSlice";
import * as yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import Comment from "./Comment";

const ChatBox = ({ job }) => {
  const { user } = useSelector((state) => state.account);
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (job?.id) {
      dispatch(createHubConnection({ job, user }));
    }

    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, job, user]);

  let initialValues = {
    body: "",
  };

  const YupValidation = yup.object().shape({
    body: yup.string().required("comment is required is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    let data = { body: values.body, jobId: job.id };
    try {
      await dispatch(addComment(data));
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Form>
              <TextField
                id="outlined-multiline-static"
                label="Enter your comment"
                name="body"
                multiline
                fullWidth
                rows={5}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                defaultValue={props.values.body}
                error={props.errors.body && props.touched.body}
                helperText={<ErrorMessage name="body" />}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ color: "white", backgroundColor: "black" }}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
      <div className="mt-[20px]">
        {comments?.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default ChatBox;
