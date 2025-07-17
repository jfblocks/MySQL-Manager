import React from 'react';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header style={{ color: '#fff', fontSize: 20 }}>MySQL 图形化管理工具</Header>
    <Content style={{ padding: 24 }}>
      <Typography.Title level={2}>欢迎使用 MySQL 图形化管理工具</Typography.Title>
      <Typography.Paragraph>
        你可以在这里连接数据库、执行SQL、管理表结构等。
      </Typography.Paragraph>
    </Content>
  </Layout>
);

export default App;