import PublicLayout from "@Layouts/PublicLayout";
import Home from "@Pages/Facebook/Home/Home";
import Login from "@Pages/Facebook/Login/Login";
import Profile from "@Pages/Facebook/Profile/Profile";
import React from "react";
import { RouteObject } from "react-router-dom";

const PublicRoute: RouteObject = {
  element: <PublicLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/profile", element: <Profile /> },
  ],
};

export default PublicRoute;
