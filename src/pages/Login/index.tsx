import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login, getUserInfo } from '../../api/user';
import { setToken, setUserInfo } from '../../store/userSlice';
import styles from './index.module.css';
import { LoginParams } from '../../types/user';

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 设置默认用户名
        form.setFieldsValue({
            username: 'zhangsan',
            password: '123123'
        });
    }, [form]);

    const onFinish = async (values: LoginParams) => {
        try {
            setLoading(true);
            const response = await login(values);
            dispatch(setToken(response.token));
            
            // 登录成功后获取用户信息
            const userInfo = await getUserInfo();
            console.log(userInfo);
            dispatch(setUserInfo(userInfo));
            
            message.success('登录成功！');
            navigate('/');
        } catch (error: any) {
            message.error(error.message || '登录失败，请重试！');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Card title="系统登录" className={styles.loginCard}>
                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item
                        name="username" 
                        rules={[
                            { required: true, message: '请输入用户名！' },
                            { min: 3, message: '用户名至少3个字符！' }
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="用户名" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码！' },
                            { min: 6, message: '密码至少6个字符！' }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />}
                            placeholder="密码" 
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            block 
                            loading={loading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login; 