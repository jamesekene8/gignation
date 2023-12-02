import { Avatar, Card, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { differenceInDays } from "date-fns";

const Comment = ({ comment }) => {
  return (
    <div className="mt-[10px]">
      <Card
        sx={{ width: "max(400px, 60%)", borderRadius: 0, "--Card-radius": 0 }}
      >
        <CardContent>
          <div className="flex">
            <div className="mr-[5px]">
              <Avatar alt={comment?.displayName} src={comment?.Image} />
            </div>
            <div className="flex flex-col justify-between">
              <Typography level="body-md">{comment?.displayName}</Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {"Posted " +
                  differenceInDays(new Date(), new Date(comment?.createdAt)) ===
                0
                  ? "recently"
                  : "Posted " +
                    differenceInDays(new Date(), new Date(comment?.createdAt)) +
                    " day(s) ago"}
              </Typography>
              <Typography level="body-sm">{comment?.body}</Typography>
            </div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
