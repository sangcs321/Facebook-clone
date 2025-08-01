import { Header } from "@Components";
import React from "react";
import { Outlet } from "react-router-dom"; // ✅ thêm import này

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
