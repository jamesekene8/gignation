import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../store/accountSlice";
import { Space, Spin } from "antd";

const RequireAuth = ({ allowedRoles }) => {
  const account = useSelector((state) => state.account);
  const user = useSelector((state) => state.account.user);
  // const dispatch = useDispatch();
  const location = useLocation();

  return !account.user && account?.token ? (
    <div className="flex justify-center items-center">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  ) : account?.token && allowedRoles?.includes(user?.role) ? (
    <Outlet />
  ) : account?.token ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
