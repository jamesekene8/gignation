import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ApprovalRoundedIcon from "@mui/icons-material/ApprovalRounded";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useSelector } from "react-redux";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const SideBar = () => {
  const user = useSelector((state) => state.account.user);

  return (
    <div className="flex-none w-[10%] justify-center flex-col items-center">
      {user?.role == "Admin" && (
        <>
          <div className=" flex flex-col justify-between items-center">
            <NavLink
              end
              to="/admin/jobs"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex flex-col justify-between items-center bg-[#D3D3D3] p-[10px] rounded-md"
                  : "flex flex-col justify-between items-center hover:bg-[#D3D3D3] p-[10px] rounded-md"
              }
            >
              <RssFeedIcon style={{ fontSize: 30, color: "grey" }} />
              <Typography variant="overline" display="block" gutterBottom>
                Posts
              </Typography>
            </NavLink>
          </div>

          <div className=" flex flex-col justify-between items-center">
            <NavLink
              end
              to="/admin/jobs/create"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex flex-col justify-between items-center bg-[#D3D3D3] p-[10px] rounded-md"
                  : "flex flex-col justify-between items-center hover:bg-[#D3D3D3] p-[10px] rounded-md"
              }
            >
              <CreateNewFolderIcon style={{ fontSize: 30, color: "grey" }} />
              <Typography variant="overline" display="block" gutterBottom>
                Create
              </Typography>
            </NavLink>
          </div>
        </>
      )}

      {user?.role === "Freelancer" && (
        <>
          <div className="flex flex-col justify-between items-center">
            <NavLink
              to="/profile/overview"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex flex-col justify-between items-center bg-[#D3D3D3] p-[10px] rounded-md"
                  : "flex flex-col justify-between items-center hover:bg-[#D3D3D3] p-[10px] rounded-md"
              }
            >
              <Person2OutlinedIcon style={{ fontSize: 30, color: "grey" }} />
              <Typography variant="overline" display="block" gutterBottom>
                Profile
              </Typography>
            </NavLink>
          </div>
          <div className="flex flex-col justify-between items-center">
            <NavLink
              end
              to="/jobs"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex flex-col justify-between items-center bg-[#D3D3D3] p-[10px] rounded-md"
                  : "flex flex-col justify-between items-center hover:bg-[#D3D3D3] p-[10px] rounded-md"
              }
            >
              <WorkOutlineOutlinedIcon
                style={{ fontSize: 30, color: "grey" }}
              />
              <Typography variant="overline" display="block" gutterBottom>
                Jobs
              </Typography>
            </NavLink>
          </div>
          <div className="flex flex-col justify-between items-center">
            <NavLink
              to="/jobs/messages"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex flex-col justify-between items-center bg-[#D3D3D3] p-[10px] rounded-md"
                  : "flex flex-col justify-between items-center hover:bg-[#D3D3D3] p-[10px] rounded-md"
              }
            >
              <ChatBubbleOutlineRoundedIcon
                style={{ fontSize: 30, color: "grey" }}
              />
              <Typography variant="overline" display="block" gutterBottom>
                Messages
              </Typography>
            </NavLink>
          </div>
          <div className=" flex flex-col justify-between items-center">
            <NavLink
              end
              to="/jobs/applied"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex flex-col justify-between items-center bg-[#D3D3D3] p-[10px] rounded-md"
                  : "flex flex-col justify-between items-center hover:bg-[#D3D3D3] p-[10px] rounded-md"
              }
            >
              <ApprovalRoundedIcon style={{ fontSize: 30, color: "grey" }} />
              <Typography variant="overline" display="block" gutterBottom>
                Applied
              </Typography>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
