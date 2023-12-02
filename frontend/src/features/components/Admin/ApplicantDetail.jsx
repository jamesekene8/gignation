import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

const ApplicantDetail = ({ applicant, onCloseDrawer }) => {
  console.log(applicant);
  return (
    <Box sx={{ width: 1200, margin: "20px" }} role="presentation">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar
            alt="Cindy Baker"
            src={applicant.photo}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4" gutterBottom>
            {applicant.firstName + " " + applicant.surname}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {applicant.email}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {applicant.country} - {applicant.desiredSalary} -{" "}
            {applicant.yearsOfExperience} years of experience
          </Typography>
          <Button variant="outlined">Get in touch</Button>
        </Grid>
      </Grid>
      <Divider sx={{ marginTop: "20px" }} />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Typography variant="h4" gutterBottom>
            {applicant.role}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {applicant.bio}
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Cover Letter
              </Typography>
              <Typography variant="body1" gutterBottom>
                {applicant.coverLetter}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicantDetail;
