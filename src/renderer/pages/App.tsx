import React, { useState } from 'react';
import { Layout, Typography, message } from 'antd';
import ConnectionPage from './ConnectionPage';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [connectionConfig, setConnectionConfig] = useState<any>(null);

  // 这里后续会调用后端API进行真实连接
  const handleConnect = async (config: any) => {
    // TODO: 调用后端API验证连接
    // 目前直接模拟成功
    setConnectionConfig(config);
    setConnected(true);
    message.success('连接成功！');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: 20 }}>MySQL 图形化管理工具</Header>
      <Content style={{ padding: 24 }}>
        {!connected ? (
          <ConnectionPage onConnect={handleConnect} />
        ) : (
          <Typography.Title level={2}>已连接到 {connectionConfig?.host}:{connectionConfig?.port}</Typography.Title>
        )}
      </Content>
    </Layout>
  );
};

export default App;