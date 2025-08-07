import { AuthLayout } from "@Layouts";
import { LoginPage, RegisterPage } from "@Pages";
import { RouteObject } from "react-router-dom";

export const AuthRoute: RouteObject = {
  element: <AuthLayout />,
  children: [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ],
};
