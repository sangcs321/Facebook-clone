import LoginLayout from "@Layouts/LoginLayout";
import Login from "@Pages/Facebook/Login/Login";
import Register from "@Pages/Facebook/Register/Register";
import React from "react";
import { RouteObject } from "react-router-dom";

export const LoginRoute: RouteObject = {
  element: <LoginLayout />,
  children: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ],
};
