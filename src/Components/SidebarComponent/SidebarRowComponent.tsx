import React from "react";
import "./SidebarRowComponent.scss";
import { Avatar } from "@mui/material";

interface SidebarRowProps {
  src?: string;
  Icon?: React.ElementType;
  title: string;
  onClick?: () => void;
}

export const SidebarRow: React.FC<SidebarRowProps> = ({
  src,
  Icon,
  title,
  onClick,
}) => {
  return (
    <div className="sidebarRow">
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  );
};
