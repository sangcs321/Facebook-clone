import { LoadingComponent, Post } from "@Components";
import { PostModel } from "@Models";
import { Avatar, Button, Dropdown, Input, Menu, message, Modal } from "antd";
import { PostApis } from "Apis/PostApis";
import { CommentModel } from "Models/CommentModel";
import React, { useEffect, useState } from "react";
import "./CommetComponent.scss";
import { CommentApis } from "Apis/CommentApis";
import { More } from "iconsax-reactjs";
import { RootState } from "@Redux/Store/Store";
import { useSelector } from "react-redux";
import { SendOutlined } from "@ant-design/icons";
interface CommentComponentProps {
  postId: number;
}

export const CommentComponent: React.FC<CommentComponentProps> = ({
  postId,
}) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const [editCommentId, setEditCommentId] = useState<number>(null);
  const [content, setContent] = useState<string>();
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await CommentApis.getAllCommentsByPostId(postId);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [postId]);
  if (loading) {
    return <LoadingComponent />;
  }
  if (!comments || comments.length === 0) {
    return <div>No comments yet</div>;
  }
  function formatRelativeTime(dateArray) {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return "";

    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime(); // chênh lệch mili-giây
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffSeconds < 60) {
      return `Vừa xong`;
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} phút`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ`;
    } else {
      return date.toLocaleDateString("vi-VN");
    }
  }
  const handleDeleteComment = (commentId: number) => {
    Modal.confirm({
      title: translate?.deleteCommentWarning,
      content: translate?.deleteContentCommentWarning,
      okText: translate?.delete,
      cancelText: translate?.cancel,
      okType: "danger",
      onOk: async () => {
        try {
          const response = await CommentApis.deleteCommentById(commentId);
          if (response.status === 200) {
            fetchComments();
          }
        } catch (err) {
          message.error(translate?.deletePostFail);
        }
      },
    });
  };
  const handleEditComment = async () => {
    if (!content || content.trim() === "") {
      message.error(translate?.commentEmpty);
      return;
    }
    try {
      console.log("content", content);
      const response = await CommentApis.editComment(editCommentId, content);
      if (response.status === 200) {
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to edit comment:", error);
      message.error("Failed to edit comment:");
    }
  };
  const handleMenuClick = (comment: CommentModel, key: string) => {
    if (key === "delete") {
      handleDeleteComment(comment.id);
    } else if (key === "edit") {
      setEditCommentId(comment.id);
      setContent(comment.content);
    }
  };
  return (
    <>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Avatar
              size={38}
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            />
            {editCommentId === comment.id ? (
              <div className="edit-comment">
                <Input
                  placeholder="Write a comment..."
                  style={{ marginLeft: 8 }}
                  suffix={
                    <Button
                      className="send-icon"
                      type="text"
                      icon={<SendOutlined />}
                      onClick={() => {
                        handleEditComment();
                        setEditCommentId(null);
                      }}
                    />
                  }
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="cancel-edit-comment">
                  <Button
                    type="link"
                    onClick={() => {
                      setEditCommentId(null);
                      setContent("");
                    }}
                  >
                    {translate?.cancel}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="comment-wrapper">
                <div className="comment-container-content">
                  <div className="comment-content">
                    <div className="comment-name">{comment.userName}</div>
                    <div className="comment-text">{comment.content}</div>
                  </div>

                  {comment.userId === user.id && (
                    <div className="dropdown-comment">
                      <Dropdown
                        overlay={
                          <Menu
                            onClick={({ key }) => handleMenuClick(comment, key)}
                          >
                            <Menu.Item key="delete">
                              {translate?.delete}
                            </Menu.Item>
                            <Menu.Item key="edit">{translate?.edit}</Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <div className="delete-post">
                          <More size="16" color="#ccc" />
                        </div>
                      </Dropdown>
                    </div>
                  )}
                </div>
                <div className="comment-time">
                  {formatRelativeTime(comment.createdAt)} · Thích · Phản hồi
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
