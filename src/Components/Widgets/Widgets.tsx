import React from "react";
import { FriendWidget } from "./FriendWidget";
import "./Widgets.scss";

interface WidgetsProps {
  onClick: (user: any) => void;
}

export const Widgets: React.FC<WidgetsProps> = ({ onClick }) => {
  const users = [
    { id: 1, name: "Nguyễn Văn A", avatar: "..." },
    { id: 2, name: "Trần Thị B", avatar: "..." },
  ];
  return (
    <div className="widgets">
      <div className="contact">
        <div>
          {" "}
          <h2>Contacts</h2>
        </div>
        {users.map((user) => (
          <FriendWidget
            key={user.id}
            src={user.avatar}
            title={user.name}
            onClick={() => onClick(user)}
          />
        ))}
      </div>
    </div>
  );
};
