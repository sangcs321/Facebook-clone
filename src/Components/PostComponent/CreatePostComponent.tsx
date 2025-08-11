import { CreatePostModel } from "@Models";
import { RootState } from "@Store";
import { Avatar, Button, message, Space, Typography } from "antd";
import { PostApis } from "Apis/PostApis";
import axios from "axios";
import {
  EmojiHappy,
  Image,
  Location,
  More,
  People,
  VideoAdd,
} from "iconsax-reactjs";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./CreatePostComponent.scss";
const { Text } = Typography;

interface CreatePostProps {
  goToStep?: (step: number) => void;
  onSuccess?: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  goToStep,
  onSuccess,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setSelectedFiles((prev) => [...prev, ...newFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click(); // mở hộp thoại chọn ảnh
  };
  const handleSubmit = async () => {
    const newPost: CreatePostModel = {
      caption: content,
      status: "friends",
      userId: user.id,
    };
    try {
      const response = await PostApis.createPost(newPost);
      console.log(response.data);
      const postId = response.data.id;
      if (selectedFiles && selectedFiles.length > 0) {
        for (const f of selectedFiles) {
          const formData = new FormData();
          formData.append("file", f);
          formData.append("userId", user.id.toString());
          formData.append("relatedType", "post");
          formData.append("relatedId", postId.toString()); // phải chuyển thành string vì formData không nhận number
          await axios.post("http://localhost:8080/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      }
      message.success("Đăng bài thành công!");
      setContent("");
      setSelectedFiles([]);
      setPreviewImages([]);
      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (error) {
      message.error("Đăng bài thất bại!");
    }
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
      {previewImages.length > 0 && (
        <Space wrap style={{ width: "100%" }}>
          {previewImages.map((img, index) => (
            <div className="imageAddPost" key={index}>
              <img src={img} alt={`preview-${index}`} />
              <button
                onClick={() => {
                  setSelectedFiles((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                  setPreviewImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
                }}
                className="deleteImgPost"
              >
                ×
              </button>
            </div>
          ))}
        </Space>
      )}
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
            Post
          </Button>
        </div>
      </Space>
    </>
  );
};
