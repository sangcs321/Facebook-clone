import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./PostComponent.scss";
import { ReactApis } from "Apis/ReactApis";
import { Image } from "antd";

interface PostProps {
  postId: number;
  userId: number;
  avatarUrl: string;
  files: string[];
  name: string;
  createdAt: string;
  caption: string;
  listReacts: number[];
  userReact?: string;
}
const emojiList = [
  { type: "Like", icon: "/like.png" },
  { type: "Love", icon: "/love.png" },
  { type: "Care", icon: "/care.png" },
  { type: "Haha", icon: "/haha.png" },
  { type: "Wow", icon: "/wow.png" },
  { type: "Sad", icon: "/sad.png" },
  { type: "Angry", icon: "/angry.png" },
];
export const Post: React.FC<PostProps> = ({
  postId,
  userId,
  avatarUrl,
  files,
  name,
  createdAt,
  caption,
  userReact,
  listReacts,
}) => {
  const renderImages = () => {
    const count = files.length;

    if (count === 1) {
      return (
        <Image
          src={files[0]}
          alt=""
          className="post-image full"
          preview={true}
          fallback="https://via.placeholder.com/200?text=No+Image"
        />
      );
    }

    if (count === 2) {
      return (
        <div className="post-image-grid two">
          {files.map((file, index) => (
            <Image
              key={index}
              src={file}
              alt=""
              className="image-half"
              preview={true}
            />
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="post-image-grid three">
          <div className="large">
            <Image src={files[0]} alt="" preview />
          </div>
          <div className="small">
            <Image src={files[1]} preview />
          </div>
          <div className="small">
            <Image src={files[2]} preview />
          </div>
        </div>
      );
    }

    if (count === 4) {
      return (
        <div className="post-image-grid four">
          {files.map((file, index) => (
            <Image
              key={index}
              src={file}
              alt=""
              className="image-quarter"
              preview
            />
          ))}
        </div>
      );
    }

    if (count >= 5) {
      return (
        <div className="post-image-grid four">
          {files.slice(0, 3).map((file, index) => (
            <Image
              key={index}
              src={file}
              className="image-quarter"
              alt=""
              preview
            />
          ))}
          <div className="overlay-container">
            <Image src={files[3]} alt="" className="image-quarter" preview />
            <div className="overlay">+{count - 4}</div>
          </div>
        </div>
      );
    }
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setshowEmojiPanel(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setshowEmojiPanel(false);
  };

  const [showEmojiPanel, setshowEmojiPanel] = useState(false);
  const [emojiText, setemojiText] = useState<string>(userReact || "Like");
  const [emojiIcon, setemojiIcon] = useState<string>(
    userReact ? `/${userReact.toLowerCase()}.png` : ""
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReacttion = async (type: string, icon: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      console.log("type ", type);
      setshowEmojiPanel(false);
      const reactData = {
        postId,
        userId,
        reactionType: type,
      };
      const reactRes = await ReactApis.updateReactPost(reactData);
      if (reactRes) {
        setemojiText(type);
        setemojiIcon(icon);
      }
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCancleReactionOrLike = async (postId: number, userId: number) => {
    console.log("handleCancleReactionOrLike");
    if (!emojiIcon && emojiText === "Like") {
      const reactData = {
        postId,
        userId,
        reactionType: "Like",
      };
      const reactRes = await ReactApis.updateReactPost(reactData);
      if (reactRes) {
        setemojiText("Like");
        setemojiIcon("/like.png");
        return;
      }
    }
    if (emojiIcon && emojiText) {
      const reactCancleData = {
        postId,
        userId,
      };
      const cancleRes = await ReactApis.cancleReactPost(reactCancleData);
      if (cancleRes) {
        setemojiIcon("");
        setemojiText("Like");
      }
      return;
    }
  };

  const renderIconReact = () => {
    return (
      <>
        <div className="react-icon" style={{ marginRight: "8px" }}>
          {!emojiIcon && emojiText === "Like" ? (
            <ThumbUpIcon />
          ) : emojiIcon ? (
            <img src={emojiIcon} alt={emojiText} />
          ) : null}
        </div>
        <div className="react-text">{emojiText}</div>
      </>
    );
  };
  const renderReactionCount = () => {
    if (!listReacts) return;
    const arr = listReacts;
    console.log("222222");
    const top3WithIndex = arr
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
    console.log(top3WithIndex);
    return <div></div>;
  };
  renderReactionCount();
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

      <div className="post_images">
        {<Image.PreviewGroup>{renderImages()}</Image.PreviewGroup>}
      </div>
      <div className="post-info">
        <div className="post-info-react">
          <div className="post-react-type">
            <img src="" alt="" />
          </div>
          <div className="post-number-react"></div>
        </div>
      </div>
      <div className="post_options">
        <div
          className="post_option"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCancleReactionOrLike(postId, userId)}
        >
          <div className="reaction-wrapper">
            <div className="react-button">{renderIconReact()}</div>
            {showEmojiPanel && (
              <div className="emoji-panel">
                {emojiList.map((emoji) => (
                  <span
                    className="emoji-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReacttion(emoji.type, emoji.icon);
                    }}
                  >
                    <img
                      key={emoji.type}
                      src={emoji.icon}
                      width={32}
                      height={32}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
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
