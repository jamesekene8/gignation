import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Avatar, Divider, Menu, MenuItem, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/accountSlice";
import { Link } from "react-router-dom";
import { getProfile } from "../store/profileSlice";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const NavBar = () => {
  const { profile } = useSelector((state) => state.profile);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="border-b-2 flex justify-between items-center">
      <div className="flex justify-center items-center p-[10px]">
        <Typography variant="h4" sx={{ color: "#14a800" }} gutterBottom>
          Gignation
        </Typography>
      </div>
      <div className="flex justify-between items-center p-[10px]">
        <div className="pr-[30px]">
          <SearchOutlinedIcon />
        </div>
        <div className="pr-[30px]">
          <NotificationsNoneOutlinedIcon />
        </div>
        <div>
          <Avatar
            onClick={handleClick}
            alt={profile?.firstName + " " + profile?.lastName}
            src={profile?.profilePhoto}
          />
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose()} disableRipple>
              <Link to="/profile/overview">
                <EditIcon />
                Edit Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose("/settings")} disableRipple>
              <SettingsIcon />
              Settings
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => handleClose("/notification")}
              disableRipple
            >
              <NotificationsIcon />
              Notification
            </MenuItem>
            <MenuItem onClick={handleLogout} disableRipple>
              <LogoutIcon />
              Logout
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
