import React, { useEffect, useState } from 'react';
import { Card, Table, Spin, message } from 'antd';
import { getTableSchema } from '../utils/ipc';

interface Props {
  connectionConfig: any;
  table: string;
}

const TableSchema: React.FC<Props> = ({ connectionConfig, table }) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [indexes, setIndexes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTableSchema(connectionConfig, table).then(res => {
      setLoading(false);
      if (res.success) {
        setColumns(res.columns || []);
        setIndexes(res.indexes || []);
      } else {
        message.error(res.message || '获取表结构失败');
      }
    });
  }, [connectionConfig, table]);

  return (
    <Spin spinning={loading}>
      <Card title={`表结构：${table}`} style={{ marginBottom: 16 }}>
        <Table
          dataSource={columns}
          columns={[
            { title: '字段名', dataIndex: 'Field', key: 'Field' },
            { title: '类型', dataIndex: 'Type', key: 'Type' },
            { title: '主键', dataIndex: 'Key', key: 'Key' },
            { title: '默认值', dataIndex: 'Default', key: 'Default' },
            { title: '备注', dataIndex: 'Comment', key: 'Comment' },
          ]}
          rowKey={row => row.Field}
          pagination={false}
          size="small"
        />
      </Card>
      <Card title="索引信息">
        <Table
          dataSource={indexes}
          columns={[
            { title: '索引名', dataIndex: 'Key_name', key: 'Key_name' },
            { title: '列名', dataIndex: 'Column_name', key: 'Column_name' },
            { title: '唯一', dataIndex: 'Non_unique', key: 'Non_unique', render: (v: any) => (v === 0 ? '是' : '否') },
            { title: '索引类型', dataIndex: 'Index_type', key: 'Index_type' },
          ]}
          rowKey={(_row, idx) => String(idx)}
          pagination={false}
          size="small"
        />
      </Card>
    </Spin>
  );
};

export default TableSchema;