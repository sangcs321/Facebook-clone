import React from "react";
import { Spin } from "antd";

export const LoadingComponent = ({ message = "Loading..." }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#fff",
    }}
  >
    <Spin size="large" tip={message} />
  </div>
);
