import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Input, Space, message, Modal } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { UserInfo } from '../../../types/user';
import styles from './index.module.css';

const UserList: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [searchText, setSearchText] = useState('');

    // 模拟获取用户列表数据
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // TODO: 替换为实际的API调用
            const mockData: UserInfo[] = [
                { id: 1, username: 'admin', email: 'admin@example.com' },
                { id: 2, username: 'user1', email: 'user1@example.com' },
                { id: 3, username: 'user2', email: 'user2@example.com' },
            ];
            setUsers(mockData);
        } catch (error) {
            message.error('获取用户列表失败');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (record: UserInfo) => {
        message.info(`编辑用户: ${record.username}`);
    };

    const handleDelete = (record: UserInfo) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除用户 ${record.username} 吗？`,
            onOk: () => {
                message.success('删除成功');
                // TODO: 调用删除API
            },
        });
    };

    const columns: ColumnsType<UserInfo> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            filteredValue: [searchText],
            onFilter: (value, record) => 
                record.username.toLowerCase().includes(value.toString().toLowerCase()),
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        编辑
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Card className={styles.container}>
            <div className={styles.header}>
                <Input
                    placeholder="搜索用户名"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className={styles.searchInput}
                />
                <Button type="primary">添加用户</Button>
            </div>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: total => `共 ${total} 条`,
                }}
            />
        </Card>
    );
};

export default UserList; 