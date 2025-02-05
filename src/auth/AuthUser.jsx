import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthUser = () => {
  const localKey = localStorage.getItem("sb-wciaxcvrseypqzeyfgjc-auth-token");

  const loacation = useLocation();
  return localKey ? (
    <Navigate to={"/"} state={{ from: loacation }} />
  ) : (
    <Outlet />
  );
};

export default AuthUser;
