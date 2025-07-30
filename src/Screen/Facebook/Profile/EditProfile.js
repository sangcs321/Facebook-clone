import { DatePicker, Tabs, Form, Input, Button, Radio, Avatar, Image, message, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useUpdateUserMutation } from '../../../Redux/RTKQuery/userApi.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../Redux/Slice/User.ts';

const EditProfile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [view, setView] = useState('profile');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [dob, setDob] = useState(null);
    const [updateUser] = useUpdateUserMutation();
    const handleUpdate = async () => {
        const profileData = { name, email, phone, address, gender, dateOfBirth: dob };
        console.log('profileData: ', profileData)
        try {
            await updateUser({ id: user.id, profileData }).unwrap();
            message.success('Cập nhật thành công!');
            setIsChanged(false);
            dispatch(setUser({ ...user, ...profileData }));
        } catch (error) {
            message.error('Cập nhật thất bại!');
            console.error(error);
        }
    };
    const onChangeInput = (setter) => (e) => {
        setter(e.target.value);
        setIsChanged(true);
    };

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setGender(user.gender || '');
            setDob(user.dateOfBirth || '');
        }
    }, [user]);
    console.log("dob: ", dob);
    console.log("dob value:", dob, "dayjs:", dayjs(dob, 'YYYY-MM-DD').isValid())

    return (
        <>
            <section style={{ maxWidth: 800, margin: 'auto', padding: 24 }}>
                <Tabs
                    activeKey={view}
                    centered
                    onChange={setView}
                    items={[
                        {
                            key: 'profile',
                            label: 'Hồ sơ',
                            children: (
                                <>
                                    <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Hồ sơ</h2>
                                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                        <Avatar
                                            size={128}
                                            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                                        />
                                    </div>
                                    {error && (
                                        <div style={{ textAlign: 'center', color: 'red', fontSize: 13, marginBottom: 10 }}>
                                            {error}
                                        </div>
                                    )}

                                    <Form layout="vertical" onFinish={handleUpdate}>
                                        <Form.Item label="Họ và tên">
                                            <Input
                                                placeholder="Nhập tên của bạn"
                                                value={name}
                                                onChange={onChangeInput(setName)}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Email">
                                            <Input
                                                type="email"
                                                placeholder="Nhập email của bạn"
                                                value={email}
                                                onChange={onChangeInput(setEmail)}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Số điện thoại">
                                            <Input
                                                placeholder="Nhập số điện thoại của bạn"
                                                value={phone}
                                                onChange={onChangeInput(setPhone)}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Địa chỉ">
                                            <Input
                                                placeholder="Nhập địa chỉ của bạn"
                                                value={address}
                                                onChange={onChangeInput(setAddress)}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Giới tính">
                                            <Radio.Group
                                                onChange={(e) => {
                                                    setGender(e.target.value)
                                                    setIsChanged(true);
                                                }}
                                                value={gender}
                                                style={{ width: '100%' }}
                                            >
                                                <Row gutter={12}>
                                                    <Col span={8} >
                                                        <Radio.Button value="MALE" className="gender-option" style={{ width: '100%' }}>
                                                            Nam
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value="FEMALE" className="gender-option" style={{ width: '100%' }}>
                                                            Nữ
                                                        </Radio.Button>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Radio.Button value="OTHER" className="gender-option" style={{ width: '100%' }}>
                                                            Khác
                                                        </Radio.Button>
                                                    </Col>
                                                </Row>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            label="Ngày sinh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn ngày sinh!',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                style={{ width: '100%' }}
                                                placeholder="Chọn ngày sinh"
                                                format="DD/MM/YYYY"
                                                value={dayjs(dob, 'YYYY-MM-DD')}
                                                onChange={(date, dateString) => {
                                                    setDob(date.format('YYYY-MM-DD'));
                                                    setIsChanged(true);
                                                }}
                                            />
                                        </Form.Item>
                                        <Form.Item style={{ textAlign: 'center' }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                disabled={!isChanged}
                                            >
                                                Cập nhật
                                            </Button>
                                        </Form.Item>

                                    </Form>
                                </>
                            ),
                        },
                        {
                            key: 'changePassword',
                            label: 'Đổi mật khẩu',
                            children: <p>Đổi mật khẩu</p>,
                        },
                    ]}
                />
            </section>
        </>
    );
};

export default EditProfile;
