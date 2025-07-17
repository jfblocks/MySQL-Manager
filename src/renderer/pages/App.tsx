import React, { useState } from 'react';
import { Layout, Typography, message } from 'antd';
import ConnectionPage from './ConnectionPage';
import SqlQueryPage from './SqlQueryPage';
import { connectDatabase } from '../utils/ipc';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [connectionConfig, setConnectionConfig] = useState<any>(null);

  const handleConnect = async (config: any) => {
    const res = await connectDatabase(config);
    if (res.success) {
      setConnectionConfig(config);
      setConnected(true);
      message.success('连接成功！');
    } else {
      message.error(res.message || '连接失败');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontSize: 20 }}>MySQL 图形化管理工具</Header>
      <Content style={{ padding: 24 }}>
        {!connected ? (
          <ConnectionPage onConnect={handleConnect} />
        ) : (
          <SqlQueryPage connectionConfig={connectionConfig} />
        )}
      </Content>
    </Layout>
  );
};

export default App;