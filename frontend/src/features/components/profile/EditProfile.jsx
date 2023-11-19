import { Card, Divider, Grid, Typography } from "@mui/material";
import EditProfileInfo from "./EditProfileInfo";
import EditProfileSocials from "./EditProfileSocials";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../app/store/profileSlice";
import { Space, Spin } from "antd";
import EditProfileEducation from "./EditProfileEducation";
import EditProfileExperience from "./EditProfileExperience";
import EditIdealNextOpportunity from "./EditIdealNextOpportunity";

const EditProfile = () => {
  const { loading, profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    let getUserProfile = async () => {
      dispatch(await getProfile());
    };
    getUserProfile();
  }, [dispatch]);

  return (
    <Card>
      {!profile ? (
        <div className="flex justify-center items-center">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <div className="p-[20px]">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className="mb-[20px]">
                <Typography variant="h5" gutterBottom>
                  About
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  Tell us about yourself so Companies know who you are
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <EditProfileInfo profile={profile} />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div>
                <Typography variant="h5" gutterBottom>
                  Social Profiles
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  Where can people find you online?
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <EditProfileSocials profile={profile} />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div>
                <Typography variant="h5" gutterBottom>
                  Education
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  What schools have you studied at?
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <EditProfileEducation />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div>
                <Typography variant="h5" gutterBottom>
                  Your work experience
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  What other positions have you held?
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <EditProfileExperience />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div>
                <Typography variant="h5" gutterBottom>
                  Ideal Next Opportunity
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  What should your ideal next opportunity look like?
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <EditIdealNextOpportunity profile={profile} />
            </Grid>
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default EditProfile;
