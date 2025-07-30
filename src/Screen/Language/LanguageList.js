import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Tabs } from 'antd';
import axios from 'axios';
import LanguageUpdate from './LanguageUpdate';
import { DeleteOutlined, EditOutlined, FormatPainterOutlined } from '@ant-design/icons';
import LanguageCustom from './LanguageCustom';

const { TabPane } = Tabs;

const LanguageList = ({ listLanguages, onSuccess, listCustom }) => {
    const [languages, setLanguages] = useState([]);
    const [listCustomState, setListCustomState] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [tab1, setTab1] = useState('');
    const [tab2, setTab2] = useState('');
    const [column1, setColumn1] = useState('');
    const [column2Vi, setColumn2Vi] = useState('');
    const [column2En, setColumn2En] = useState('');
    const [column3, setColumn3] = useState('');
    const [action1, setAction1] = useState('');
    const [action2, setAction2] = useState('');
    const [updateLanguage, setUpdateLanguage] = useState('');
    useEffect(() => {
        setLanguages(listLanguages);
        setListCustomState(listCustom);
    }, [listLanguages, listCustom]);
    const fetchLanguages = () => {
        axios.get("http://localhost:8080/api/language/search?keyword=ListLang")
            .then(response => {
                setTab1(response.data.find(item => item.code === 'ListLangTabVi')?.name || '');
                setTab2(response.data.find(item => item.code === 'ListLangTabEn')?.name || '');
                setColumn1(response.data.find(item => item.code === 'ListLangColumn1')?.name || '');
                setColumn2Vi(response.data.find(item => item.code === 'ListLangColumn2Vi')?.name || '');
                setColumn2En(response.data.find(item => item.code === 'ListLangColumn2En')?.name || '');
                setColumn3(response.data.find(item => item.code === 'ListLangColumn3')?.name || '');
                setAction1(response.data.find(item => item.code === 'ListLangAction1')?.name || '');
                setAction2(response.data.find(item => item.code === 'ListLangAction2')?.name || '');
                setUpdateLanguage(response.data.find(item => item.code === 'ListLangModalTitle')?.name || '');
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleDelete = (record) => {
        console.log('Xóa ngôn ngữ:', `http://localhost:8080/api/language/${record.code}`);
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa ngôn ngữ "${record.code}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                return axios.delete(`http://localhost:8080/api/language/${record.code}`)
                    .then(() => {
                        setLanguages(languages.filter(lang => lang.code !== record.code));
                        message.success('Ngôn ngữ đã được xóa thành công!');
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa:', error);
                        message.error('Xóa thất bại!');
                    });
            }
        });
    };
    const handleDeleteCustom = (record) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa Custom "${record.code}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                return axios.delete(`http://localhost:8080/api/custom`, {
                    data: record
                })
                    .then(() => {
                        setListCustomState(prev =>
                            prev.filter(lang => lang.code !== record.code)
                        );
                        console.log('listCustomState:', listCustomState);
                        message.success('Custom đã được xóa thành công!');
                    })
                    .catch(error => {
                        console.error('Lỗi khi xóa:', error);
                        message.error('Xóa thất bại!');
                    });
            }
        });
    };
    const handleEdit = (record) => {
        setEditingData(record);
        setIsModalVisible(true);
    };
    const handleCustom = (record) => {
        setEditingData(record);
        setIsModalVisible2(true);
    };

    const actionColumn = {
        title: column3,
        key: 'actions',
        render: (text, record) => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button type="primary" onClick={() => handleEdit(record)}><EditOutlined /></Button>
                <Button type="primary" onClick={() => handleCustom(record)}><FormatPainterOutlined /></Button>
                <Button danger onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
            </div>
        )
    };
    const actionColumnCus = {
        title: column3,
        key: 'actions',
        render: (text, record) => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button type="primary" onClick={() => handleCustom(record)}><FormatPainterOutlined /></Button>
                <Button danger onClick={() => handleDeleteCustom(record)}><DeleteOutlined /></Button>
            </div>
        )
    };
    // Cột cho tab tiếng Việt
    const columnsVi = [
        { title: column1, dataIndex: 'code', key: 'code' },
        { title: column2Vi, dataIndex: 'nameVi', key: 'nameVi' },
        actionColumn
    ];

    // Cột cho tab tiếng Anh
    const columnsEn = [
        { title: column1, dataIndex: 'code', key: 'code' },
        { title: column2En, dataIndex: 'nameEn', key: 'nameEn' },
        actionColumn
    ];
    const columnsCus = [
        { title: column1, dataIndex: 'code', key: 'code' },
        { title: "Công ty", dataIndex: 'company', key: 'company' },
        { title: "Tên Tiếng Việt", dataIndex: 'nameVi', key: 'nameVi' },
        { title: "Tên Tiếng Anh", dataIndex: 'nameEn', key: 'nameEn' },
        actionColumnCus
    ];

    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span>{tab1}</span>} key="1">
                    <Table rowKey="id" dataSource={languages} columns={columnsVi} />
                </TabPane>
                <TabPane tab={<span>{tab2}</span>} key="2">
                    <Table rowKey="id" dataSource={languages} columns={columnsEn} />
                </TabPane>
                <TabPane tab={<span>Custom</span>} key="3">
                    <Table rowKey="id" dataSource={listCustomState} columns={columnsCus} />
                </TabPane>
            </Tabs>

            <Modal
                title={updateLanguage}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                width={800}
                footer={null}
            >
                <LanguageUpdate
                    data={editingData}
                    onSuccess={() => {
                        onSuccess();
                        setIsModalVisible(false);
                    }}
                    onClose={() => {
                        setIsModalVisible(false);
                    }}
                />
            </Modal>
            <Modal
                title="Custom"
                open={isModalVisible2}
                onCancel={() => setIsModalVisible2(false)}
                width={1000}
                footer={null}
            >
                <LanguageCustom
                    data={editingData}
                    onSuccess={() => {
                        onSuccess();
                        setIsModalVisible2(false);
                    }}
                    onClose={() => {
                        setIsModalVisible2(false);
                    }}
                />
            </Modal>
        </>
    );
};

export default LanguageList;
