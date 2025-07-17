import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';

interface ConnectionForm {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

const ConnectionPage: React.FC<{ onConnect: (config: ConnectionForm) => void }> = ({ onConnect }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ConnectionForm) => {
    setLoading(true);
    try {
      await onConnect(values);
    } catch (e: any) {
      message.error(e.message || '连接失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="连接到MySQL数据库" style={{ maxWidth: 400, margin: '40px auto' }}>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ port: '3306' }}>
        <Form.Item label="主机" name="host" rules={[{ required: true, message: '请输入主机地址' }]}> <Input /> </Form.Item>
        <Form.Item label="端口" name="port" rules={[{ required: true, message: '请输入端口号' }]}> <Input /> </Form.Item>
        <Form.Item label="用户名" name="user" rules={[{ required: true, message: '请输入用户名' }]}> <Input /> </Form.Item>
        <Form.Item label="密码" name="password"> <Input.Password /> </Form.Item>
        <Form.Item label="数据库名" name="database" rules={[{ required: true, message: '请输入数据库名' }]}> <Input /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>连接</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConnectionPage;