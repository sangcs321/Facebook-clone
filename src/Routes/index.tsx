import { useRoutes } from "react-router-dom";
import { LoginRoute } from "./LoginRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  const routes = [PublicRoute, LoginRoute];
  return useRoutes(routes);
};

export default AppRoutes;
