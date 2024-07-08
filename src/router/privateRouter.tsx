import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userStore } from "../store/userStore.js";

const PrivateRouter = () => {
  const token = userStore((state) => state.token);
  const location = useLocation();
  const auth = token !== "";
  if (!auth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return <Outlet />;
};
export default PrivateRouter;
