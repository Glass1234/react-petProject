import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRouter = () => {
  const token = localStorage.getItem("token") || "";
  const location = useLocation();
  const auth = token !== "";
  if (!auth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return <Outlet />;
};
export default PrivateRouter;
