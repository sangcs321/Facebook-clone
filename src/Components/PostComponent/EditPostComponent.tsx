import { PostModel } from "@Models";
import { RootState } from "@Store";
import { Avatar, Button, message, Space, Typography } from "antd";
import { PostApis } from "Apis/PostApis";
import {
  EmojiHappy,
  Image,
  Location,
  More,
  People,
  VideoAdd,
} from "iconsax-reactjs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./CreatePostComponent.scss";
const { Text } = Typography;

interface EditPostProps {
  goToStep?: (step: number) => void;
  onSuccess?: () => void;
  post: PostModel;
}

export const EditPost: React.FC<EditPostProps> = ({
  goToStep,
  onSuccess,
  post,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [existFiles, setexistFiles] = useState<string[]>([]);
  const [newfiles, setNewFiles] = useState<File[]>([]);
  const [content, setContent] = useState<string>(post.caption);
  useEffect(() => {
    if (post) {
      setContent(post.caption || "");
      setexistFiles(post.listFiles || []);
      setNewFiles([]);
    }
  }, [post]);
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewFiles((prev) => [...prev, ...files]);
  };
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click(); // mở hộp thoại chọn ảnh
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    const updateData = {
      caption: content,
      existFiles,
    };
    formData.append(
      "data",
      new Blob([JSON.stringify(updateData)], { type: "application/json" })
    );
    newfiles.forEach((file) => {
      formData.append("newFiles", file);
    });
    try {
      await PostApis.updatePost(post.id, formData);
      message.success("Cập nhật bài viết thành công!");
      setContent("");
      setexistFiles([]);
      setNewFiles([]);
      onSuccess();
    } catch {
      message.error("Cập nhật bài viết thất bại!");
    }
  };
  const handleRemoveExistFiles = (url: string) => {
    setexistFiles((prev) => prev.filter((img) => img !== url));
  };
  const handleRemoveNewFile = (file: File) => {
    setNewFiles((prev) => prev.filter((f) => f !== file));
  };
  return (
    <>
      <Space align="start" style={{ marginBottom: 16 }}>
        <Avatar src={user.avatarUrl} size="large" />
        <div>
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <Button size="small" onClick={() => goToStep(1)}>
            👥 Friends
          </Button>
        </div>
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <textarea
            className="textAreaCaption"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What on your mind?"
            rows={5}
            cols={40}
            style={{ width: "100%", border: "none" }}
          />
        </div>
      </Space>
      <Space wrap style={{ width: "100%" }}>
        {existFiles.map((img, index) => (
          <div className="imageAddPost" key={index}>
            <img src={img} alt={`preview-${index}`} />
            <button
              onClick={() => {
                handleRemoveExistFiles(img);
              }}
              className="deleteImgPost"
            >
              ×
            </button>
          </div>
        ))}
        {newfiles.map((file, index) => (
          <div className="imageAddPost" key={index}>
            <img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
            <button
              onClick={() => {
                handleRemoveNewFile(file);
              }}
              className="deleteImgPost"
            >
              ×
            </button>
          </div>
        ))}
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div className="addToPost">
          <Text style={{ color: "#e4e6eb", fontWeight: 500, marginLeft: 5 }}>
            Add to your post
          </Text>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              className="iconButtonStyle"
              style={{ color: "#45bd62" }}
              onClick={handleClick}
            >
              <Image size="20" color="#45bd62" variant="Bold" />
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={hiddenFileInput}
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
            <button className="iconButtonStyle">
              <People size="20" color="#1877f2" variant="Bold" />
            </button>
            <button className="iconButtonStyle">
              <EmojiHappy size="20" color="#f7b928" variant="Bold" />
            </button>
            <button className="iconButtonStyle">
              <Location size="20" color="#f5533d" variant="Bold" />
            </button>
            <button className="iconButtonStyle">
              <VideoAdd size="20" color="#56d9e9" variant="Bold" />
            </button>
            <button className="iconButtonStyle">
              <More size="20" color="#ccc" variant="Outline" />
            </button>
          </div>
        </div>
        <div>
          <Button size="middle" className="postBtn" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </div>
      </Space>
    </>
  );
};
