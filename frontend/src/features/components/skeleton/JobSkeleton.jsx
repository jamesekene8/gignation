import {
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";

const JobSkeleton = () => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: "20px", backgroundColor: "#fff" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Skeleton width="40%" height={30} />
        </Typography>
        <div style={{ marginBottom: "30px" }}></div>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          <Skeleton width="30%" />
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 9 }} variant="body2">
          <Skeleton width="5%" height={30} />
        </Typography>
        <Typography variant="body3">
          <Skeleton variant="rectangular" width={1180} height={118} />
        </Typography>
        <div style={{ marginBottom: "20px" }}></div>
        <Typography sx={{ mb: 1.5, fontSize: 11 }} variant="body2">
          {/* {tags.map((val, k) => (
		<Tags key={k} name={val} />
	   ))} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Skeleton width="5%" height={30} />
      </CardActions>
    </Card>
  );
};

export default JobSkeleton;
