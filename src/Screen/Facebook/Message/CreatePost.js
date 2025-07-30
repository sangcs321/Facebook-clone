import React, { useRef, useState } from "react";
import { Avatar, Button, message, Space, Typography } from "antd";
import "./CreatePost.css";
import ImageIcon from '@mui/icons-material/Image';
import PeopleIcon from '@mui/icons-material/People';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import GifBoxIcon from '@mui/icons-material/GifBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../../../Redux/RTKQuery/postApi.ts";
const { Text } = Typography;

const CreatePost = ({ goToStep }) => {
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState([
    // "https://picsum.photos/600/400?random=2",
    // "https://picsum.photos/600/400?random=2",
    // "https://picsum.photos/600/400?random=2",
    // "https://picsum.photos/600/400?random=2",
    // "https://picsum.photos/600/400?random=2",
    // "https://picsum.photos/600/400?random=2",
  ]);
  const [createPost, { data, isLoading, error }] = useCreatePostMutation();
  const [content, setContent] = useState('');
  const handleImageSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]); // setImages là useState([...])
    }
  };
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click(); // mở hộp thoại chọn ảnh
  };
  const handleSubmit = async  () => {
    try {
      const response = await createPost({
        caption: content,
        status: 'friends',
        userId: user.id
      }).unwrap(); // unwrap giúp bắt lỗi thật sự

      message.success("Đăng bài thành công!");
      console.log(response); // nếu cần xử lý tiếp
    } catch (error) {
      message.error("Đăng bài thất bại!")
    }
  }
  return (
    <>
      <Space align="start" style={{ marginBottom: 16 }}>
        <Avatar src={user.avatar} size="large" />
        <div>
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <Button size="small" onClick={() => goToStep(1)}>👥 Friends</Button>
        </div>
      </Space>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <textarea className="textAreaCaption"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What on your mind?"
            rows={5}
            cols={40}
            style={{ width: '100%', border: 'none' }}
          />
        </div>
      </Space>
      {images.length > 0 && (
        <Space wrap style={{ width: '100%' }}>
          {images.map((img, index) => (
            <div className="imageAddPost" key={index}>
              <img
                src={img}
                alt={`preview-${index}`}
                style={{ width: '100%' }}
              />
              <button
                onClick={() =>
                  setImages(prev => prev.filter((_, i) => i !== index))
                }
                className="deleteImgPost"
              >
                ×
              </button>
            </div>
          ))}
        </Space>
      )}
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="addToPost">
          <Text style={{ color: '#e4e6eb', fontWeight: 500, marginLeft: 5 }}>Add to your post</Text>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="iconButtonStyle" style={{ color: '#45bd62' }} onClick={handleClick}>
              <ImageIcon />
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={hiddenFileInput}
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            <button className="iconButtonStyle" style={{ color: '#1877f2' }}>
              <PeopleIcon />
            </button>
            <button className="iconButtonStyle" style={{ color: '#f7b928' }}>
              <InsertEmoticonIcon />
            </button>
            <button className="iconButtonStyle" style={{ color: '#f5533d' }}>
              <FmdGoodIcon />
            </button>
            <button className="iconButtonStyle" style={{ color: '#56d9e9' }}>
              <GifBoxIcon />
            </button>
            <button className="iconButtonStyle" style={{ color: '#ccc' }}>
              <MoreHorizIcon />
            </button>
          </div>
        </div>
        <div>
          <Button size="middle" className="postBtn" onClick={handleSubmit}>Post</Button>
        </div>
      </Space>

    </>
  );
};

export default CreatePost;
