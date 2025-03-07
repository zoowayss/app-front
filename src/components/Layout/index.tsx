import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, message } from 'antd';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { logout as logoutAction, setUserInfo } from '../../store/userSlice';
import { RootState } from '../../store';
import styles from './index.module.css';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (token && !userInfo) {
                try {
                    const info = await getUserInfo();
                    dispatch(setUserInfo(info));
                } catch (error) {
                    dispatch(logoutAction());
                    navigate('/login');
                }
            }
        };

        fetchUserInfo();
    }, [token, userInfo, dispatch, navigate]);

    const handleLogout = async () => {
        try {
            // await logout();
            dispatch(logoutAction());
            message.success('退出成功！');
            navigate('/login');
        } catch (error) {
            message.error('退出失败，请重试！');
        }
    };

    const userMenu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: '个人信息',
                onClick: () => navigate('/user/profile'),
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
                onClick: handleLogout,
            },
        ],
    };

    const menuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: '首页',
        },
        {
            key: 'user',
            icon: <UserOutlined />,
            label: '用户管理',
            children: [
                {
                    key: '/user/list',
                    label: '用户列表',
                },
                {
                    key: '/user/profile',
                    label: '个人信息',
                },
            ],
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Link to="/" className={styles.logo}>
                    <h1 className={styles.logoText}>
                        {collapsed ? 'MS' : '管理系统'}
                    </h1>
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                    <div className={styles.userInfo}>
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <span className={styles.userDropdown}>
                                <UserOutlined /> {userInfo?.email}
                            </span>
                        </Dropdown>
                    </div>
                </Header>
                <Content className={styles.content}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout; 