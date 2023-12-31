import { Typography } from "@mui/material";

const Education = ({ edu }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {edu.degree}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {edu.name} - 2020
      </Typography>
    </div>
  );
};

export default Education;
