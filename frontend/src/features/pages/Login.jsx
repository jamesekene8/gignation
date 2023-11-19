import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [formName, setFormName] = useState(true);
  const location = useLocation();
  const account = useSelector((state) => state.account);
  const from = location.state?.from?.pathname || "/";

  return (
    <>
      {account?.token ? (
        <Navigate to="/" replace={true} />
      ) : (
        <div
          className="w-full overflow-hidden flex"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div className="w-[50%] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
            <div>
              <div className="text-center mb-[32px]">
                <Typography variant="h2" gutterBottom>
                  Gignation - Bringing Jobs to you!!
                </Typography>
              </div>

              <div className="text-center text-[1.2rem] mb-[22px]">
                <Typography variant="h5" gutterBottom>
                  Find your dream job and make a living from home now...
                </Typography>
              </div>

              <div className="text-center ">
                <button
                  type="button"
                  className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2"
                  onClick={() => setFormName(!formName)}
                >
                  {formName
                    ? "Register as a freelancer"
                    : "Login as a freelancer"}
                </button>
              </div>
            </div>
          </div>
          <div className="w-[50%] flex justify-center items-center">
            {formName ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
