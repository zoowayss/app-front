import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

// 定义响应数据的基础接口
interface BaseResponse<T = any> {
    error: number;
    data: T;
    message: string;
}

// 创建axios实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 获取token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        message.error('请求发送失败');
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse<BaseResponse>) => {
        const res = response.data;
        
        // 根据后端约定的状态码判断请求是否成功
        if (res.error === 0) {
            return res.data;
        }
        
        // 处理特定的错误码
        switch (res.error) {
            case 401:
                // 未登录或token过期
                localStorage.removeItem('token');
                window.location.href = '/login';
                message.error('登录已过期，请重新登录');
                break;
            case 403:
                message.error('没有权限访问');
                break;
            case 500:
                message.error('服务器错误');
                break;
            default:
                message.error(res.message || '请求失败');
        }
        
        return Promise.reject(new Error(res.message || '请求失败'));
    },
    (error) => {
        // 处理网络错误
        if (!error.response) {
            message.error('网络连接失败，请检查网络');
            return Promise.reject(new Error('网络连接失败'));
        }
        
        // 处理HTTP状态码错误
        switch (error.response.status) {
            case 401:
                localStorage.removeItem('token');
                window.location.href = '/login';
                message.error('登录已过期，请重新登录');
                break;
            case 403:
                message.error('没有权限访问');
                break;
            case 404:
                message.error('请求的资源不存在');
                break;
            case 500:
                message.error('服务器错误');
                break;
            default:
                message.error(error.response.data?.message || '请求失败');
        }
        
        return Promise.reject(error);
    }
);

// 封装请求方法
const request = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return instance.get(url, config);
    },
    
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return instance.post(url, data, config);
    },
    
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return instance.put(url, data, config);
    },
    
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return instance.delete(url, config);
    },
    
    // 上传文件的方法
    upload<T = any>(url: string, file: File, config?: AxiosRequestConfig): Promise<T> {
        const formData = new FormData();
        formData.append('file', file);
        
        return instance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...config,
        });
    },
    
    // 下载文件的方法
    download(url: string, filename?: string) {
        return instance
            .get(url, { responseType: 'blob' })
            .then((response: AxiosResponse<Blob>) => {
                const blob = new Blob([response.data]);
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = filename || 'download';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            });
    }
};

export default request; 