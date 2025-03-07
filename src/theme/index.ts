import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
    colorBgContainer: '#fff',
  },
  components: {
    Layout: {
      bodyBg: '#f0f2f5',
      headerBg: '#fff',
      siderBg: '#001529',
    },
    Menu: {
      darkItemBg: '#001529',
    },
    Card: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    },
  },
}; 