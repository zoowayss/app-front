import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={112893}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={81234}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文章总数"
              value={9280}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="团队数量"
              value={56}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="系统公告">
            <p>欢迎使用管理系统！</p>
            <p>这里是系统的首页，您可以在这里查看一些基础数据统计。</p>
            <p>左侧菜单提供了系统的主要功能导航，请根据需要选择相应的功能模块。</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home; 