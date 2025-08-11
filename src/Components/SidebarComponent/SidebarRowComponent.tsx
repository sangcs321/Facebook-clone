import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarRowComponent.scss";
import { useNavigate } from "react-router-dom";

interface SidebarRowProps {
  src?: string;
  Icon?: React.ElementType;
  title: string;
  onClick?: () => void;
}

export const SidebarRow: React.FC<SidebarRowProps> = ({ src, Icon, title }) => {
  return (
    <div className="sidebarRow">
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  );
};
