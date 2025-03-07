import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { store } from './store';
import MainLayout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { theme } from './theme';
import './index.css';
import UserList from './pages/User/List';
import Profile from './pages/User/Profile';
import NotFound from './pages/NotFound';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider theme={theme} locale={zhCN}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <MainLayout />
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="home" element={<Navigate to="/" replace />} />
                            <Route path="user">
                                <Route path="list" element={<UserList />} />
                                <Route path="profile" element={<Profile />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
); 