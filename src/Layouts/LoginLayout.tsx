import React from "react";
import { Outlet } from "react-router-dom"; // ✅ thêm import này

const LoginLayout = () => {
  return (
    <>
      <main>
        <Outlet /> 
      </main>
    </>
  );
};

export default LoginLayout;
