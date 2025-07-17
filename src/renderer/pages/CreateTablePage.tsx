import React, { useState } from 'react';
import { Card, Form, Input, Button, Space, Select, message } from 'antd';
import { createTable } from '../utils/ipc';

const typeOptions = [
  'INT', 'VARCHAR(255)', 'TEXT', 'DATETIME', 'DATE', 'FLOAT', 'DOUBLE', 'BOOLEAN'
];

const CreateTablePage: React.FC<{ connectionConfig: any; onCreated: () => void }> = ({ connectionConfig, onCreated }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([{ name: '', type: 'VARCHAR(255)', nullable: true, extra: '' }]);
  const [loading, setLoading] = useState(false);

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'VARCHAR(255)', nullable: true, extra: '' }]);
  };
  const handleFieldChange = (idx: number, key: string, value: any) => {
    setFields(fields.map((f, i) => i === idx ? { ...f, [key]: value } : f));
  };
  const handleRemoveField = (idx: number) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    const res = await createTable(connectionConfig, values.table, fields);
    setLoading(false);
    if (res.success) {
      message.success('创建成功');
      onCreated();
    } else {
      message.error(res.message || '创建失败');
    }
  };

  return (
    <Card title="新建数据表" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item label="表名" name="table" rules={[{ required: true, message: '请输入表名' }]}> <Input /> </Form.Item>
        <Form.Item label="字段">
          {fields.map((field, idx) => (
            <Space key={idx} style={{ display: 'flex', marginBottom: 8 }}>
              <Input placeholder="字段名" value={field.name} onChange={e => handleFieldChange(idx, 'name', e.target.value)} style={{ width: 120 }} />
              <Select value={field.type} onChange={v => handleFieldChange(idx, 'type', v)} style={{ width: 140 }}>
                {typeOptions.map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
              </Select>
              <Select value={field.nullable} onChange={v => handleFieldChange(idx, 'nullable', v)} style={{ width: 80 }}>
                <Select.Option value={true}>可空</Select.Option>
                <Select.Option value={false}>必填</Select.Option>
              </Select>
              <Input placeholder="额外(如AUTO_INCREMENT)" value={field.extra} onChange={e => handleFieldChange(idx, 'extra', e.target.value)} style={{ width: 140 }} />
              <Button onClick={() => handleRemoveField(idx)} danger>删除</Button>
            </Space>
          ))}
          <Button onClick={handleAddField} type="dashed" style={{ marginTop: 8 }}>添加字段</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>创建</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateTablePage;