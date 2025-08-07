import { Friend } from "@Models";
import { Avatar } from "@mui/material";
import React from "react";
import "./ChatboxComponent.scss";
import { Call, CloseCircle, Minus, Video } from "iconsax-reactjs";
interface ChatBoxProps {
  user: Friend;
  onClose: () => void;
}
export const ChatBox: React.FC<ChatBoxProps> = ({ user, onClose }) => {
  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="avatar">
          <Avatar
            src={
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            }
          />
        </div>
        <div className="info">Người dùng</div>

        <div className="icon-group">
          <div className="icon-item call">
            <Call size="24" color="#ffffff" variant="Outline" />
          </div>
          <div className="icon-item video">
            <Video size="24" color="#ffffff" variant="Outline" />
          </div>
          <div className="icon-item minimize">
            <Minus size="24" color="#ffffff" variant="Outline" />
          </div>
          <div className="icon-item close">
            <CloseCircle
              size="24"
              color="#ffffff"
              variant="Outline"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
      <div className="chat-content">chat box</div>
      <div className="chat-input">
        <div>
          <input className="input-text" type="text"></input>
        </div>
      </div>
    </div>
  );
};
