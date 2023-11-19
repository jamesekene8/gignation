import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);

  const handleClick = () => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/admin/jobs");
      } else {
        navigate("/jobs");
      }
    } else {
      navigate("/jobs");
    }
  };

  return (
    <div
      className="w-full overflow-hidden flex"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="w-[100%] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
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
              onClick={handleClick}
            >
              Discover new Jobs waiting for you
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
