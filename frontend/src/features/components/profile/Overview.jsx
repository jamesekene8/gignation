import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

import Experience from "./Experience";
import Education from "./Education";
import About from "./About";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { getProfile } from "../../../app/store/profileSlice";
import { Space, Spin } from "antd";

const Overview = () => {
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
        <>
          <Typography variant="h4" gutterBottom sx={{ padding: "10px" }}>
            What recruiters will see
          </Typography>
          <CardContent>
            <Container maxWidth="fixed">
              <Box sx={{ border: 1, borderColor: "divider" }}>
                <div className="p-[20px]">
                  <div className="flex justify-between ">
                    <div className=" flex">
                      <Avatar
                        alt={profile?.firstName + " " + profile?.lastName}
                        src={profile?.profilePhoto}
                        sx={{ width: 70, height: 65 }}
                      />
                      <div className="pl-[9px] flex flex-col justify-between">
                        <Typography variant="h5" gutterBottom>
                          {profile?.firstName + " " + profile?.surname}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {profile?.yearsOfExperience} year of exp •{" "}
                          {profile?.country} • UTC •{" "}
                          {profile?.remote ? "Remote Only" : "flexible"}
                        </Typography>
                      </div>
                    </div>
                    <div className=" flex">
                      <a
                        href={profile?.linkdln}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkedInIcon />
                      </a>

                      <a
                        href={profile?.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GitHubIcon />
                      </a>

                      <a
                        href={profile?.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TwitterIcon />
                      </a>
                    </div>
                  </div>
                  <div className="mt-[20px]">
                    <Typography variant="overline" display="block" gutterBottom>
                      About me
                    </Typography>
                    <About bio={profile?.bio} />
                  </div>
                  <div className="mt-[20px]">
                    <Typography variant="overline" display="block" gutterBottom>
                      Experience
                    </Typography>
                    {profile?.experiences?.map((exp, i) => (
                      <Experience key={exp.id} exp={exp} />
                    ))}
                  </div>
                  <div className="mt-[20px]">
                    <Typography variant="overline" display="block" gutterBottom>
                      Education
                    </Typography>
                    {profile?.educations?.map((edu) => (
                      <Education key={edu.id} edu={edu} />
                    ))}
                  </div>
                  <div className="mt-20px">
                    <Typography variant="h6" gutterBottom>
                      Ideal Next Opportunity
                    </Typography>

                    <div className="mb-[15px]">
                      <Typography variant="body2" gutterBottom>
                        Desired Salary
                      </Typography>
                      <Chip label={profile?.desiredSalary} />
                    </div>
                    <div className="mb-[15px]">
                      <Typography variant="body2" gutterBottom>
                        Desired Role
                      </Typography>
                      <Chip label={profile?.desiredRole} />
                    </div>
                    <div className="mb-[15px]">
                      <Typography variant="body2" gutterBottom>
                        Remote Work
                      </Typography>
                      <Chip
                        label={profile?.remote ? "Remote Only" : "Flexible"}
                      />
                    </div>
                    <div className="mb-[15px]">
                      <Typography variant="body2" gutterBottom>
                        Desired Locations
                      </Typography>

                      <Chip label={profile?.desiredLocation} />
                    </div>
                  </div>
                </div>
              </Box>
            </Container>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Overview;
