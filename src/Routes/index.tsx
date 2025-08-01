import LoginLayout from "@Layouts/LoginLayout";
import PublicLayout from "@Layouts/PublicLayout";
import HomeScreen from "@Pages/Facebook/Home/Home";
import Login from "@Pages/Facebook/Login/Login";
import Profile from "@Pages/Facebook/Profile/Profile";
import Register from "@Pages/Facebook/Register/Register";
import { Route, Routes, useRoutes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import { LoginRoute } from "./LoginRoute";

const AppRoutes = () => {
  const routes = [PublicRoute, LoginRoute];
  return useRoutes(routes);
};

export default AppRoutes;
