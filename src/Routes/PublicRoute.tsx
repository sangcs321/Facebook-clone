import { RequireAuth } from "@Components";
import PublicLayout from "@Layouts/PublicLayout";
import Home from "@Pages/Facebook/Home/Home";
import Profile from "@Pages/Facebook/Profile/Profile";
import { RouteObject } from "react-router-dom";

const PublicRoute: RouteObject = {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/profile",
      element: (
        <RequireAuth>
          <Profile />
        </RequireAuth>
      ),
    },
  ],
};

export default PublicRoute;
