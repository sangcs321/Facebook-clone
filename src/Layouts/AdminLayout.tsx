import Header from "@/Components/Header/Header";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <main>{children}</main>
    </>
  );
};

export default AdminLayout;