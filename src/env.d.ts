/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // 添加其他环境变量声明
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 