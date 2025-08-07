import { PublicLayout } from "@Layouts";
import { HomePage, ProfilePage } from "@Pages";
import { RouteObject } from "react-router-dom";

export const PublicRoute: RouteObject = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ],
};
