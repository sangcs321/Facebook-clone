import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./PostComponent.scss";
import { ReactApis } from "Apis/ReactApis";
import { Image, Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@Redux/Store/Store";
import { CommentModal } from "@Components";
import { ReactModel } from "@Models";
import { CommentApis } from "Apis/CommentApis";
import { c } from "framer-motion/dist/types.d-Bq-Qm38R";

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
  isComment?: boolean;
}
const emojiList = [
  { type: "like", icon: "/like.png" },
  { type: "love", icon: "/love.png" },
  { type: "care", icon: "/care.png" },
  { type: "haha", icon: "/haha.png" },
  { type: "wow", icon: "/wow.png" },
  { type: "sad", icon: "/sad.png" },
  { type: "angry", icon: "/angry.png" },
];
type ReactionKey = "like" | "love" | "haha" | "wow" | "sad" | "angry" | "care";

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
  isComment,
}) => {
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const user = useSelector((state: RootState) => state.user);
  const reactionTexts: Record<ReactionKey, string> = {
    like: translate.like,
    love: translate.love,
    care: translate.care,
    haha: translate.haha,
    wow: translate.wow,
    sad: translate.sad,
    angry: translate.angry,
  };
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
  const [emojiKey, setemojiKey] = useState<string>(
    userReact ? userReact.toLowerCase() : "like"
  );
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
        reactionType: type.charAt(0).toUpperCase() + type.slice(1),
      };
      const reactRes = await ReactApis.updateReactPost(reactData);
      if (reactRes) {
        setemojiKey(type);
        setemojiIcon(icon);
        fetchTotalReacts();
      }
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCancleReactionOrLike = async (postId: number, userId: number) => {
    if (!emojiIcon && emojiKey === "like") {
      const reactData = {
        postId,
        userId,
        reactionType: "Like",
      };
      const reactRes = await ReactApis.updateReactPost(reactData);
      if (reactRes) {
        setemojiKey("like");
        setemojiIcon("/like.png");
        fetchTotalReacts();
      }
    } else if (emojiIcon && emojiKey) {
      const reactCancleData = {
        postId,
        userId,
      };
      const cancleRes = await ReactApis.cancleReactPost(reactCancleData);
      if (cancleRes) {
        setemojiIcon("");
        setemojiKey("like");
        fetchTotalReacts();
      }
    }
  };

  const renderIconReact = () => {
    return (
      <>
        <div className="react-icon" style={{ marginRight: "8px" }}>
          {!emojiIcon && emojiKey === "like" ? (
            <ThumbUpIcon />
          ) : emojiIcon ? (
            <img src={emojiIcon} alt={emojiKey} />
          ) : null}
        </div>
        <div className="react-text">
          {reactionTexts[emojiKey as ReactionKey]}
        </div>
      </>
    );
  };
  const [totalReacts, setTotalReacts] = useState<number>();
  const [reacts, setReacts] = useState([]);
  const [listUsers, setlistUsers] = useState<string[]>([]);
  const [commentCount, setCommentCount] = useState(0);

  const fetchTotalReacts = async () => {
    const totalReactRes = await ReactApis.getTotalReactByPostId(postId);
    const responseListUser = await ReactApis.getListUsersReact(postId);
    const responseReacts = await ReactApis.getReactByPostId(postId);
    const responseCommentCount = await CommentApis.countCommentsByPostId(
      postId
    );
    console.log(totalReactRes);
    if (totalReactRes.status === 200) {
      setTotalReacts(totalReactRes.data);
    }
    if (responseListUser.status === 200) {
      setlistUsers(responseListUser.data);
    }
    if (responseReacts.status === 200) {
      setReacts(responseReacts.data);
    }
    if (responseCommentCount.status === 200) {
      setCommentCount(responseCommentCount.data);
    }
  };

  useEffect(() => {
    fetchTotalReacts();
  }, [postId]);

  const renderReactionCount = () => {
    if (!reacts || reacts.length === 0) return null;

    // Đếm số lượng từng loại reaction
    const reactionCountMap = reacts;

    // Lấy top 3 loại reaction nhiều nhất
    const topReacts = Object.entries(reactionCountMap)
      .filter(([, count]) => count > 0) // chỉ lấy loại có count > 0
      .sort((a, b) => Number(b[1]) - Number(a[1])) // sort giảm dần
      .slice(0, 3) // lấy tối đa 3 loại
      .map(([type]) => {
        const emoji = emojiList.find((e) => e.type === type.toLowerCase());
        return emoji ? emoji.icon : null;
      })
      .filter(Boolean); // bỏ những icon null

    // Tạo text hiển thị tên hoặc số lượng
    let text = "";
    if (listUsers.length === 1) {
      text = listUsers[0]; // chỉ 1 người react
    } else if (listUsers.length > 1) {
      text = `${listUsers[0]} và ${listUsers.length - 1} người khác`;
    }

    return (
      <div className="post-info-react">
        {/* Hiển thị icon top 3 */}
        <div className="post-react-type">
          {topReacts.map((icon, idx) => (
            <img
              key={idx}
              src={icon!}
              alt=""
              style={{
                width: 20,
                height: 20,
                marginRight: idx < topReacts.length - 1 ? -5 : 0, // chồng lên nhau
                zIndex: topReacts.length - idx,
                border: "2px solid white",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>

        {/* Hiển thị tên hoặc số lượng */}
        <div className="post-number-react">{text}</div>
      </div>
    );
  };
  const [commentModal, setCommentModal] = useState(false);
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
        {renderReactionCount()}
        <div className="post-info-comment">
          <div>{commentCount > 0 && `${commentCount} comments`}</div>
        </div>
      </div>
      <div className="post_options">
        <div
          className="post_option"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCancleReactionOrLike(postId, user.user.id)}
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

        <div
          className="post_option"
          onClick={() => {
            if (isComment) return;
            setCommentModal(true);
          }}
        >
          <ChatBubbleOutlineIcon />
          <p>{translate?.postComment}</p>
        </div>

        <div className="post_option">
          <NearMeIcon />
          <p>{translate?.postShare}</p>
        </div>
      </div>
      <Modal
        visible={commentModal}
        onCancel={() => setCommentModal(false)}
        footer={null}
        bodyStyle={{ padding: 0 }}
        className="comment-modal"
      >
        <CommentModal
          postId={postId}
          fetchComments={() => fetchTotalReacts()}
        />
      </Modal>
    </div>
  );
};
