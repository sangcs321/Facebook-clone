import React from "react";
import { FriendWidget } from "./FriendWidgetComponent";
import "./WidgetsComponent.scss";
import { useSelector } from "react-redux";
import { RootState } from "@Redux/Store/Store";

interface WidgetsProps {
  onClick: (user: any) => void;
}
const users = [
  { id: 1, name: "Nguyễn Văn A", avatar: "..." },
  { id: 2, name: "Trần Thị B", avatar: "..." },
];
export const Widgets: React.FC<WidgetsProps> = ({ onClick }) => {
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  return (
    <div className="widgets">
      <div className="contact">
        <div>
          <h2>{translate?.widgetsContactsTitle}</h2>
        </div>
        {users.map((user) => (
          <FriendWidget
            key={user.id}
            avatarUrl={user.avatar}
            name={user.name}
            onClick={() => onClick(user)}
          />
        ))}
      </div>
    </div>
  );
};
