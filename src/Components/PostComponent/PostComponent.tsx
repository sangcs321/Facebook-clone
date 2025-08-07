import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar, gridClasses, imageListClasses } from "@mui/material";
import React from "react";
import "./PostComponent.scss";
import dayjs from "dayjs";

interface PostProps {
  avatarUrl: string;
  files: string[];
  name: string;
  createdAt: string;
  caption: string;
}

export const Post: React.FC<PostProps> = ({
  avatarUrl,
  files,
  name,
  createdAt,
  caption,
}) => {
  const renderImages = () => {
    const count = files.length;
    if (count == 1) {
      return <img src={files[0]} alt="" className="post-image full" />;
    }

    if (count == 2) {
      return (
        <div className="post-image-grid two">
          {files.map((file, index) => (
            <img key={index} src={file} alt="" className="image-half" />
          ))}
        </div>
      );
    }
    if (count == 3) {
      return (
        <div className="post-image-grid three">
          <div className="large">
            <img src={files[0]} alt="" />
          </div>
          <div className="small">
            <img src={files[1]} />
          </div>
          <div className="small">
            <img src={files[2]} />
          </div>
        </div>
      );
    }
    if (count == 4) {
      return (
        <div className="post-image-grid four">
          {files.map((file, index) => (
            <img src={file} key={index} alt="" className="image-quarter" />
          ))}
        </div>
      );
    }
    if (count >= 5) {
      return (
        <div className="post-image-grid four">
          {files.slice(0, 3).map((file, index) => (
            <img src={file} key={index} className="image-quarter" alt="" />
          ))}
          <div className="overlay-container">
            <img src={files[3]} alt="" className="image-quarter" />
            <div className="overlay">+{count - 4}</div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="post">
      <div className="post_top">
        <Avatar src={avatarUrl} className="post_avatar" />

        <div className="post_topInfo">
          <h3>{name}</h3>
          <p>
            {createdAt[2]}-{createdAt[1]}-{createdAt[0]}
          </p>
        </div>
      </div>

      <div className="post_bottom">
        <p>{caption}</p>
      </div>

      <div className="post_images">{renderImages()}</div>

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
