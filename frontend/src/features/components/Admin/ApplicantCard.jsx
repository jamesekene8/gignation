import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ApplicantCard = ({ applicant }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="mb-[10px]">
      <Card>
        <CardContent>
          <div className="flex">
            <div className="mr-[10px]">
              <Avatar alt="Cindy Baker" src={applicant.photo} />
            </div>
            <div>
              <Typography variant="h6" gutterBottom>
                {applicant.firstName + " " + applicant.surname}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                {applicant.title}
              </Typography>
              <Button variant="contained" size="small" onClick={handleOpen}>
                View Cover Letter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cover Letter
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {applicant.coverLetter}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ApplicantCard;
