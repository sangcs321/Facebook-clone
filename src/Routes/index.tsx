import { useRoutes } from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import { PublicRoute } from "./PublicRoute";
import { AdminRoute } from "./AdminRoute";

const AppRoutes = () => {
  const routes = [PublicRoute, AuthRoute, AdminRoute];
  return useRoutes(routes);
};

export default AppRoutes;
