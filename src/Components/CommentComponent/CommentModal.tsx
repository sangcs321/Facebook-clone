import { LoadingComponent, Post } from "@Components";
import { CommentModel, PostModel } from "@Models";
import { PostApis } from "Apis/PostApis";
import React, { useEffect, useState } from "react";
import { CommentComponent } from "./CommentComponent";
import { Avatar, Button, Input } from "antd";
import "./CommentModal.scss";
import { SendOutlined } from "@ant-design/icons";
import { CommentApis } from "Apis/CommentApis";
import { useSelector } from "react-redux";
interface CommentProps {
  postId: number;
  fetchComments?: () => void;
}

export const CommentModal: React.FC<CommentProps> = ({
  postId,
  fetchComments,
}) => {
  const [post, setPost] = useState<PostModel | undefined>();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string | undefined>();
  const { user } = useSelector((state: any) => state.user);
  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await PostApis.getPostById(postId);
      if (response.status === 200) {
        setPost(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);
  if (loading) {
    return <LoadingComponent />;
  }
  if (!post) {
    return <div>Post not found</div>;
  }
  const handleCommentSubmit = async () => {
    if (!content) return;
    const newComment: CommentModel = {
      postId: post.id,
      userId: user.id,
      content,
    };
    try {
      const response = await CommentApis.createComment(newComment);
      if (response.status === 200) {
        setContent(undefined);
        fetchPost();
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };
  return (
    <>
      <div className="comment-modal-wrapper">
        <Post
          postId={post.id}
          userId={post.userId}
          avatarUrl={post.avatarUrl}
          caption={post.caption}
          createdAt={post.createdAt}
          name={post.name}
          files={post.listFiles}
          userReact={post.userReact}
          listReacts={post.listReacts}
          isComment={true}
        />
        <div className="comment-scroll-area">
          <CommentComponent postId={post.id} />
        </div>
        <div className="write-comment-wrapper">
          <Avatar
            size={38}
            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
          />
          <Input
            placeholder="Write a comment..."
            suffix={
              <Button
                className="send-icon"
                type="text"
                icon={<SendOutlined />}
                disabled={!content}
                onClick={() => handleCommentSubmit()}
              />
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
