import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />

      <div>
        <div className="container mx-auto p-[5px]">
          <NavBar />
          <Grid container spacing={2} columns={16} sx={{ marginTop: "20px" }}>
            <Grid item xs={6} md={2}>
              <SideBar />
            </Grid>
            <Grid item xs={6} md={14}>
              <Outlet />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Layout;
