import { AdminLayout } from "@Layouts";
import { LanguageManage } from "@Pages";
import { RouteObject } from "react-router-dom";

export const AdminRoute: RouteObject = {
  element: <AdminLayout />,
  children: [
    {
      path: "/languages",
      element: <LanguageManage />,
    },
  ],
};
