import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Avatar } from "antd";
import { format, differenceInDays } from "date-fns";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router-dom";

const JobPostingCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/jobs/${id}`);
  };

  return (
    <Card
      fullwidth
      sx={{ marginTop: "15px" }}
      onClick={() => handleClick(job.id)}
    >
      <CardActionArea>
        <CardContent>
          <div className="flex">
            <div className="mr-[10px]">
              <Avatar variant="square">{job?.companyName[0]}</Avatar>
            </div>
            <div className="flex justify-between w-[100%]">
              <div>
                <Typography variant="h5" gutterBottom>
                  {job?.title}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                  {job?.description.length < 50
                    ? job?.description
                    : job?.description.slice(0, 500) + "......."}
                </Typography>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                ></Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {"Posted " +
                    differenceInDays(new Date(), new Date(job.createdAt)) +
                    " days ago"}
                </Typography>
              </div>
              <div>
                <ArrowForwardIosIcon />
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobPostingCard;
