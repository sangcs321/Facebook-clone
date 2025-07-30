import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button, Tabs, Card, Row, Col, Space, Modal } from 'antd';
import {
    EditOutlined,
    PlusOutlined,
    MoreOutlined,
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './Profile.css';
import Header from '../Header/Header';
import EditProfile from './EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { TabPane } = Tabs;

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const user = useSelector((state) => state.user);
    console.log("user state: ", user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showModal = () => setIsModalVisible(true);
    const handleOk = () => {
        setIsModalVisible(false);

    };
    const handleCancel = () => setIsModalVisible(false);

    return (
        <Layout className="profile-layout">
            <Header />
            <div className="cover-photo">
                <img
                    src="/koenigsegg.jpg"
                    alt="Cover"
                    className="cover-img"
                />
                {/* <Button className="edit-cover-btn" icon={<EditOutlined />}>
                    Edit cover photo
                </Button> */}
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
                                <Button icon={<EditOutlined />} onClick={showModal}>Edit profile</Button>
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

                        <Card title="Posts" className="posts-card">
                            <p>No recent posts to show.</p>
                        </Card>
                    </TabPane>

                    <TabPane tab="About" key="2">About content...</TabPane>
                    <TabPane tab="Friends" key="3">Friend list...</TabPane>
                    <TabPane tab="Photos" key="4">Photos...</TabPane>
                    <TabPane tab="Videos" key="5">Videos...</TabPane>
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
        </Layout>
    );
};

export default Profile;