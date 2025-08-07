import React from "react";
import "./FriendWidgetComponent.scss";
import { Avatar } from "@mui/material";

interface FriendWidgetProps {
  avatarUrl?: string;
  name: string;
  onClick: () => void;
}
export const FriendWidget: React.FC<FriendWidgetProps> = ({
  avatarUrl,
  name,
  onClick,
}) => {
  return (
    <div className="friendWidget" onClick={onClick}>
      {avatarUrl && <Avatar src={avatarUrl} />}
      <h4>{name}</h4>
    </div>
  );
};
