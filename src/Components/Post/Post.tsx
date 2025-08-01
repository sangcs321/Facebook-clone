import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar } from "@mui/material";
import React from "react";
import "./Post.scss";

interface PostProps {
  profilePic: string;
  image: string;
  username: string;
  timestamp: string;
  message: string;
}

export const Post: React.FC<PostProps> = ({
  profilePic,
  image,
  username,
  timestamp,
  message,
}) => {
  return (
    <div className="post">
      <div className="post_top">
        <Avatar
          src={
            "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
          }
          className="post_avatar"
        />

        <div className="post_topInfo">
          <h3>Sang</h3>
          <p>2025-07-29</p>
        </div>
      </div>

      <div className="post_bottom">
        <p>{message}</p>
      </div>

      <div className="post_image">
        <img src={image} alt="" />
      </div>

      <div className="post_options">
        <div className="post_option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>

        <div className="post_option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>

        <div className="post_option">
          <NearMeIcon />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
};
