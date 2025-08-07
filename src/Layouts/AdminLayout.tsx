import { RequireAuth } from "@Components";
import React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <RequireAuth allowedRoles={["ADMIN"]}>
        <main>
          <Outlet />
        </main>
      </RequireAuth>
    </>
  );
};
