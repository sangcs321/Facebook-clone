import PublicLayout from "@Layouts/PublicLayout";
import Home from "@Pages/Facebook/Home/Home";
import Profile from "@Pages/Facebook/Profile/Profile";
import { RouteObject } from "react-router-dom";

const PublicRoute: RouteObject = {
  element: <PublicLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/profile", element: <Profile /> },
  ],
};

export default PublicRoute;
