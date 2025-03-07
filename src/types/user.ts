export interface LoginParams {
    username: string;
    password: string;
}

export interface UserInfo {
    uid: number;
    email: string;
    deleted: boolean;
}

export interface LoginResponse {
    token: string;
    userInfo: UserInfo;
}

export interface UpdateUserParams extends Partial<UserInfo> {
    // 如果需要额外的字段可以在这里添加
}

export interface UploadAvatarResponse {
    url: string;
}

export interface ApiResponse<T> {
    error: number;
    msg: string;
    data: T;
    redirectUrl: string | null;
    isEncrypted: number;
}