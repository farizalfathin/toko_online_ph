import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRouter = () => {
  const localKey = localStorage.getItem("sb-ftiuevfqtgwqzungcrhh-auth-token");

  const location = useLocation();
  return localKey ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default AuthRouter;
