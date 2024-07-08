import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../components/Auth";
import ListItemPage from "../components/ListItem";
import PrivateRouter from "./privateRouter";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<PrivateRouter />}>
        <Route path="/list" element={<ListItemPage />} />
        {/* ----- */}
        <Route path="*" element={<Navigate to="/list" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
