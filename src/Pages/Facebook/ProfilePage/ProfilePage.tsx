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
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PostModel } from "@Models";
import { PostApis } from "Apis/PostApis";
import { More } from "iconsax-reactjs";
import "./ProfilePage.scss";
import { EditPost } from "@Components";
import { transform } from "framer-motion";

const { Content } = Layout;
const { TabPane } = Tabs;

export const ProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const [postsProfile, setpostsProfile] = useState<PostModel[]>([]);
  const limit = 5;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);
  const fetchPosts = useCallback(
    async (currentPage: number) => {
      if (!user.id || !hasMore || loading) return;
      setLoading(true);
      try {
        const postsRes = await PostApis.getPostsByUserId(
          user.id,
          currentPage,
          limit
        );
        if (postsRes.status === 200) {
          const newPosts = postsRes.data;
          setpostsProfile((prev) => [...prev, ...newPosts]);
          if (newPosts.length < limit) {
            setHasMore(false);
          }
        }
      } catch (error) {
        message.error("Không thể lấy bài viết. Vui lòng thử lại sau.");
        console.log("Lỗi khi lấy bài viết ở ProfilePage:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [user.id]
  );
  // Tải lần đầu
  useEffect(() => {
    if (user.id) {
      fetchPosts(0);
    }
  }, [user.id]);
  // Tải khi trang thay đổi (cho các trang > 0)
  useEffect(() => {
    if (page > 0) {
      fetchPosts(page);
    }
  }, [page, fetchPosts]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 500 &&
        !isFetching.current &&
        hasMore
      ) {
        isFetching.current = true;
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);
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
      title: translate?.deletePostWarning,
      content: translate?.deleteContentPostWarning,
      okText: translate?.delete,
      cancelText: translate?.cancel,
      okType: "danger",
      onOk: async () => {
        try {
          const response = await PostApis.deletePostById(postId);
          if (response.status === 200) {
            message.success(translate?.deletePostSuccess);
            fetchPosts(0);
            setpostsProfile([]);
            setPage(0);
            setHasMore(true);
          }
        } catch (err) {
          message.error(translate?.deletePostFail);
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
                <Button icon={<PlusOutlined />}>{translate?.addToStory}</Button>
                <Button icon={<EditOutlined />} onClick={showModal}>
                  {translate?.editProfile}
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Tabs defaultActiveKey="1" className="profile-tabs">
          <TabPane tab={translate?.tabProfilePosts} key="1">
            <Card title="Intro" className="intro-card">
              <p>🏠 Lives in {user.address}</p>
              <p>📅 {user.dateOfBirth}</p>
              {/* <p>📅 Joined on October 2016</p> */}
              <Button>{translate?.editProfileDetails}</Button>
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
                      userId={post.userId}
                      postId={post.id}
                      avatarUrl={user.avatarUrl}
                      caption={post.caption}
                      createdAt={post.createdAt}
                      name={post.name}
                      files={post.listFiles}
                      userReact={post.userReact}
                      listReacts={post.listReacts}
                    />
                    <Dropdown
                      overlay={
                        <Menu onClick={({ key }) => handleMenuClick(post, key)}>
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
                ))}
            </div>
          </TabPane>

          <TabPane tab={translate?.tabProfileAbout} key="2">
            About content...
          </TabPane>
          <TabPane tab={translate?.tabProfileFriends} key="3">
            Friend list...
          </TabPane>
          <TabPane tab={translate?.tabProfilePhotos} key="4">
            Photos...
          </TabPane>
          <TabPane tab={translate?.tabProfileVideos} key="5">
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
        title={translate?.editPost}
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
            fetchPosts(0);
            setIsModalEditPost(false);
            setpostsProfile([]);
            setPage(0);
            setHasMore(true);
          }}
        />
      </Modal>
    </Layout>
  );
};
