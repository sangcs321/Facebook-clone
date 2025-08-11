import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CreatePost, EditProfile, Post } from "@Components";
import { RootState } from "@Store";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Layout,
  Menu,
  message,
  Modal,
  Row,
  Space,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PostModel } from "@Models";
import { PostApis } from "Apis/PostApis";
import { More } from "iconsax-reactjs";
import "./ProfilePage.scss";
import { EditPost } from "Components/PostComponent/EditPostComponent";

const { Content } = Layout;
const { TabPane } = Tabs;

export const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [postsProfile, setpostsProfile] = useState<PostModel[]>([]);
  const fecthData = async () => {
    const postsResUser = await PostApis.getPostsByUserId(user.id);
    if (postsResUser.status === 200) {
      setpostsProfile(postsResUser.data);
    }
  };
  useEffect(() => {
    if (user.id) {
      fecthData();
    }
  }, [user.id]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalEditPost, setIsModalEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState<PostModel | null>(null);
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => setIsModalVisible(false);

  const handleDeletePost = (postId: number) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa bài viết này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await PostApis.deletePostById(postId);
          message.success("Xóa bài viết thành công!");
          fecthData();
        } catch (err) {
          message.error("Xóa thất bại!");
        }
      },
    });
  };
  const handleEditPost = () => {
    setIsModalEditPost(true);
  };
  const handleMenuClick = (post: PostModel, key: string) => {
    if (key === "delete") {
      handleDeletePost(post.id);
    } else if (key === "edit") {
      setEditingPost(post);
      handleEditPost();
    }
  };
  return (
    <Layout className="profile-layout">
      <div className="cover-photo">
        <img src="/koenigsegg.jpg" alt="Cover" className="cover-img" />
      </div>
      <Content className="profile-content">
        <Card className="profile-card">
          <Row justify="space-between" align="middle" gutter={[32, 0]}>
            <Col>
              <Space size="large">
                <Avatar
                  size={200}
                  src="https://i.pravatar.cc/300"
                  className="profile-avatar"
                />
                <div>
                  <h2>{user.name}</h2>
                  {/* <p>615 friends</p> */}
                </div>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button icon={<PlusOutlined />}>Add to story</Button>
                <Button icon={<EditOutlined />} onClick={showModal}>
                  Edit profile
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Tabs defaultActiveKey="1" className="profile-tabs">
          <TabPane tab="Posts" key="1">
            <Card title="Intro" className="intro-card">
              <p>🏠 Lives in {user.address}</p>
              <p>📅 {user.dateOfBirth}</p>
              {/* <p>📅 Joined on October 2016</p> */}
              <Button>Edit details</Button>
            </Card>

            {/* <Card title="Posts" className="posts-card">
              <p>No recent posts to show.</p>
              àdshfoajsdf
            </Card> */}

            <div className="post-profile">
              {postsProfile
                .filter((post) => post.status !== "deleted")
                .map((post) => (
                  <div className="post-profile-item">
                    <Post
                      key={post.id}
                      postId={post.id}
                      userId={post.userId}
                      avatarUrl={user.avatarUrl}
                      caption={post.caption}
                      createdAt={post.createdAt}
                      name={post.name}
                      files={post.listFiles}
                      listReacts={post.listReacts}
                    />
                    <Dropdown
                      overlay={
                        <Menu onClick={({ key }) => handleMenuClick(post, key)}>
                          <Menu.Item key="delete">Xóa</Menu.Item>
                          <Menu.Item key="edit">Chỉnh sửa</Menu.Item>
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
                ))}
            </div>
          </TabPane>

          <TabPane tab="About" key="2">
            About content...
          </TabPane>
          <TabPane tab="Friends" key="3">
            Friend list...
          </TabPane>
          <TabPane tab="Photos" key="4">
            Photos...
          </TabPane>
          <TabPane tab="Videos" key="5">
            Videos...
          </TabPane>
        </Tabs>
      </Content>
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        okText="Save"
      >
        <EditProfile />
      </Modal>
      <Modal
        title="Edit post"
        open={isModalEditPost}
        onCancel={() => {
          setIsModalEditPost(false);
          setEditingPost(null);
        }}
        footer={null}
        className="custom-modal-title"
      >
        <EditPost
          post={editingPost}
          onSuccess={() => {
            fecthData();
            setIsModalEditPost(false);
          }}
        />
      </Modal>
    </Layout>
  );
};
