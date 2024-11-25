import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 配置路径别名，让 stories 文件能正确引用 ys-ui 的组件
      '@ys-ui': path.resolve(__dirname, '../../packages/ys-ui/src'),
    },
  },
})
