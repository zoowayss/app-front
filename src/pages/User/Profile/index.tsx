import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, message, Avatar } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setUserInfo } from '../../../store/userSlice';
import { updateUserInfo, uploadAvatar } from '../../../api/user';
import type { UploadProps } from 'antd';
import type { UserInfo } from '../../../types/user';
import styles from './index.module.css';

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: Partial<UserInfo>) => {
        try {
            setLoading(true);
            const updatedUser = await updateUserInfo(values);
            dispatch(setUserInfo(updatedUser));
            message.success('个人信息更新成功');
        } catch (error) {
            message.error('更新失败，请重试');
        } finally {
            setLoading(false);
        }
    };

    const uploadProps: UploadProps = {
        name: 'file',
        showUploadList: false,
        beforeUpload: async (file) => {
            try {
                const result = await uploadAvatar(file);
                if (userInfo) {
                    dispatch(setUserInfo({ ...userInfo, avatar: result.url }));
                }
                message.success('头像上传成功');
            } catch (error) {
                message.error('头像上传失败');
            }
            return false;
        },
    };

    // 如果没有用户信息，显示加载状态或返回登录页
    if (!userInfo) {
        return <Card loading={true} />;
    }

    return (
        <Card className={styles.container}>
            <div className={styles.header}>
                <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    src={userInfo.avatar}
                    className={styles.avatar}
                />
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>更换头像</Button>
                </Upload>
            </div>

            <Form
                form={form}
                layout="vertical"
                initialValues={userInfo}
                onFinish={handleSubmit}
                className={styles.form}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        { required: true, message: '请输入用户名' },
                        { min: 3, message: '用户名至少3个字符' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        保存修改
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Profile; 