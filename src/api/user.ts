import request from './request';
import { LoginParams, LoginResponse, UserInfo, UploadAvatarResponse } from '../types/user';

// 登录
export const login = (data: LoginParams) => {
    const { username, ...rest } = data;
    const newData = { account: username, ...rest };
    return request.post<LoginResponse>('/v1/account/login', { ...newData, "method": "ACCOUNT_PWD" });
};

// 获取用户信息
export const getUserInfo = () => {
    return request.get<UserInfo>('/v1/account/userInfo');
};

// 更新用户信息
export const updateUserInfo = (data: Partial<UserInfo>) => {
    return request.put<UserInfo>('/user/info', data);
};

// 上传头像
export const uploadAvatar = (file: File) => {
    return request.upload<UploadAvatarResponse>('/user/avatar', file);
};

export const logout = () => {
    return request.post('/auth/logout');
}; 