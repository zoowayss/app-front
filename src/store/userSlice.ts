import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../types/user';

interface UserState {
    userInfo: UserInfo | null;
    token: string | null;
}

// 获取初始用户信息
const userInfoStr = localStorage.getItem('userInfo');
const initialUserInfo = userInfoStr ? JSON.parse(userInfoStr) : null;

const initialState: UserState = {
    userInfo: initialUserInfo,
    token: localStorage.getItem('token'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
            // 将用户信息存储到 localStorage
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            // 清除本地存储
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setUserInfo, setToken, logout } = userSlice.actions;
export default userSlice.reducer; 