# React Admin Template

一个基于 React + TypeScript + Ant Design 的后台管理系统模板。
## 技术栈

- ⚡️ [Vite](https://vitejs.dev/) - 极速的前端构建工具
- ⚛️ [React 18](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- 🏗️ [TypeScript](https://www.typescriptlang.org/) - 带有类型系统的 JavaScript
- 🎨 [Ant Design 5](https://ant.design/) - 企业级 UI 设计语言和 React 组件库
- 📦 [Redux Toolkit](https://redux-toolkit.js.org/) - Redux 官方推荐的工具集
- 🚦 [React Router 6](https://reactrouter.com/) - 声明式路由管理
- 🔄 [Axios](https://axios-http.com/) - 基于 Promise 的 HTTP 客户端

## 主要功能

### 1. 用户认证
- 登录/登出功能
- 基于 Token 的身份验证
- 路由访问权限控制

### 2. 布局系统
- 响应式布局
- 可折叠侧边栏
- 面包屑导航
- 用户下拉菜单

### 3. 路由配置
- 嵌套路由支持
- 404 页面处理
- 路由懒加载

### 4. 状态管理
- 基于 Redux Toolkit 的状态管理
- 用户信息持久化
- Token 管理

### 5. 网络请求
- Axios 封装
- 统一的错误处理
- 请求/响应拦截器
- Token 自动注入
- 文件上传/下载

### 6. UI 组件
- 登录页面
- 首页数据统计
- 用户管理列表
- 个人信息页面
- 404 错误页

### 7. 工具和优化
- TypeScript 类型支持
- 路径别名配置 (@/*)
- CSS Modules 样式隔离
- 生产环境优化
  - 代码分割
  - 静态资源处理
  - Console 日志移除

## 项目结构 
```
src/
├── api/ # API 接口封装
├── components/ # 公共组件
├── pages/ # 页面组件
├── store/ # Redux 状态管理
├── types/ # TypeScript 类型定义
├── theme/ # 主题配置
├── utils/ # 工具函数
└── main.tsx # 应用入口
```

## 开发说明

### 安装依赖
```bash
npm install
```

### 运行开发环境
```bash
npm run dev
```

### 生产环境构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 环境变量配置

在项目根目录创建 `.env` 文件：

```env
VITE_API_BASE_URL=你的API地址
```

## 浏览器支持

- 现代浏览器
- Chrome >= 64
- Firefox >= 63
- Safari >= 12
- Edge >= 79

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

[MIT](LICENSE)
[![Star History Chart](https://api.star-history.com/svg?repos=zoowayss/react-admin&type=Date)](https://star-history.com/#zoowayss/react-admin&Date)
