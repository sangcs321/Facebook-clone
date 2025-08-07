import { Header, RequireAuth } from "@Components";
import React from "react";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <RequireAuth>
      <>
        <Header />
        <main>
          <Outlet />
        </main>
      </>
    </RequireAuth>
  );
};
