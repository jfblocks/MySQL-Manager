import React, { useEffect, useState } from 'react';
import { List, Spin, message, Popconfirm, Button, Space } from 'antd';
import { getTables, dropTable } from '../utils/ipc';

interface Props {
  connectionConfig: any;
  onSelectTable: (table: string) => void;
}

const TableList: React.FC<Props> = ({ connectionConfig, onSelectTable }) => {
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTables = () => {
    setLoading(true);
    getTables(connectionConfig).then(res => {
      setLoading(false);
      if (res.success) {
        setTables(res.tables || []);
      } else {
        message.error(res.message || '获取表列表失败');
      }
    });
  };

  useEffect(() => {
    fetchTables();
  }, [connectionConfig]);

  const handleDrop = async (table: string) => {
    const res = await dropTable(connectionConfig, table);
    if (res.success) {
      message.success('删除成功');
      fetchTables();
    } else {
      message.error(res.message || '删除失败');
    }
  };

  return (
    <Spin spinning={loading}>
      <List
        size="small"
        bordered
        dataSource={tables}
        renderItem={item => (
          <List.Item style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <span onClick={() => onSelectTable(item)}>{item}</span>
            <Popconfirm title="确定删除该表？" onConfirm={() => handleDrop(item)}>
              <Button size="small" danger>删除</Button>
            </Popconfirm>
          </List.Item>
        )}
        style={{ maxHeight: 400, overflow: 'auto' }}
      />
    </Spin>
  );
};

export default TableList;