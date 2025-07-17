import React, { useState } from 'react';
import { Card, Button, Input, Table, message } from 'antd';
import { executeQuery } from '../utils/ipc';

interface Props {
  connectionConfig: any;
}

const SqlQueryPage: React.FC<Props> = ({ connectionConfig }) => {
  const [sql, setSql] = useState('SELECT 1');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const handleRun = async () => {
    setLoading(true);
    const res = await executeQuery(connectionConfig, sql);
    setLoading(false);
    if (res.success) {
      setData(res.rows || []);
      if (res.fields) {
        setColumns(res.fields.map((f: any) => ({ title: f.name, dataIndex: f.name, key: f.name })));
      }
    } else {
      setData([]);
      setColumns([]);
      message.error(res.message || '查询失败');
    }
  };

  return (
    <Card title="SQL 查询" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Input.TextArea
        rows={4}
        value={sql}
        onChange={e => setSql(e.target.value)}
        placeholder="输入SQL语句"
        style={{ marginBottom: 12 }}
      />
      <Button type="primary" onClick={handleRun} loading={loading} style={{ marginBottom: 16 }}>
        执行
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(_row, idx) => String(idx)}
        pagination={{ pageSize: 20 }}
        bordered
        size="small"
      />
    </Card>
  );
};

export default SqlQueryPage;